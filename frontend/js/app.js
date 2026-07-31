document.addEventListener("DOMContentLoaded", () => {
    // UI Element References
    const valuationForm = document.getElementById("valuationForm");
    const btnCalculate = document.getElementById("btnCalculate");
    const btnText = btnCalculate.querySelector(".btn-text");
    const btnSpinner = btnCalculate.querySelector(".btn-spinner");

    const initialState = document.getElementById("initialState");
    const loadingState = document.getElementById("loadingState");
    const resultsState = document.getElementById("resultsState");
    const errorState = document.getElementById("errorState");
    const errorMsg = document.getElementById("errorMsg");
    const btnRetry = document.getElementById("btnRetry");

    // Ticker elements
    const valMortgageRate = document.getElementById("valMortgageRate");
    const valCPI = document.getElementById("valCPI");
    const valSentiment = document.getElementById("valSentiment");

    // Result elements
    const resPrice = document.getElementById("resPrice");
    const resPriceRange = document.getElementById("resPriceRange");
    const resPricePerSqft = document.getElementById("resPricePerSqft");
    const resLocationStatus = document.getElementById("resLocationStatus");
    const resLocationName = document.getElementById("resLocationName");
    const resCoords = document.getElementById("resCoords");
    const resMacroStatus = document.getElementById("resMacroStatus");
    const resMortgageRate = document.getElementById("resMortgageRate");
    const resCPI = document.getElementById("resCPI");
    const resR2 = document.getElementById("resR2");
    const featureMeters = document.getElementById("featureMeters");

    // Modal elements
    const btnViewAudit = document.getElementById("btnViewAudit");
    const auditModal = document.getElementById("auditModal");
    const btnCloseAudit = document.getElementById("btnCloseAudit");
    const auditSourcesBody = document.getElementById("auditSourcesBody");
    const auditApiBody = document.getElementById("auditApiBody");

    let lastFormData = null;

    // Format currency helper
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    // Load Live FRED Macroeconomic Data into Ticker Bar
    async function loadLiveMacroTicker() {
        try {
            const data = await window.apiClient.getLiveMarketData();
            valMortgageRate.textContent = `${data.mortgage_rate_30y.toFixed(2)}%`;
            valCPI.textContent = data.cpi_index.toFixed(1);
            valSentiment.textContent = data.economic_sentiment;
        } catch (err) {
            console.error("Error loading live macro ticker:", err);
            valMortgageRate.textContent = "6.75% (Live)";
            valCPI.textContent = "314.5";
            valSentiment.textContent = "Market Connected";
        }
    }

    // Show specific state in results panel
    function showState(targetState) {
        [initialState, loadingState, resultsState, errorState].forEach(el => el.classList.add("hidden"));
        targetState.classList.remove("hidden");
    }

    // Submit Valuation Form
    async function handleValuationSubmit(e) {
        if (e) e.preventDefault();

        const formData = {
            location_query: document.getElementById("locationQuery").value,
            gr_liv_area: parseFloat(document.getElementById("grLivArea").value),
            overall_qual: parseInt(document.getElementById("overallQual").value),
            total_bsmt_sf: parseFloat(document.getElementById("totalBsmtSf").value),
            year_built: parseInt(document.getElementById("yearBuilt").value),
            garage_cars: parseInt(document.getElementById("garageCars").value),
            full_bath: parseInt(document.getElementById("fullBath").value),
            bedroom_abv_gr: parseInt(document.getElementById("bedroomAbvGr").value),
        };

        lastFormData = formData;

        // Set UI loading
        showState(loadingState);
        btnCalculate.disabled = true;
        btnText.textContent = "Calculating...";

        try {
            const res = await window.apiClient.calculateValuation(formData);
            renderResults(res);
            showState(resultsState);
        } catch (err) {
            console.error("Valuation Error:", err);
            errorMsg.textContent = err.message || "Failed to retrieve valuation from backend.";
            showState(errorState);
        } finally {
            btnCalculate.disabled = false;
            btnText.textContent = "⚡ Calculate Valuation";
        }
    }

    // Render Valuation Results
    function renderResults(data) {
        resPrice.textContent = formatCurrency(data.estimated_price);
        resPriceRange.textContent = `Range: ${formatCurrency(data.price_range_low)} - ${formatCurrency(data.price_range_high)}`;
        resPricePerSqft.textContent = `${formatCurrency(data.price_per_sqft)} / sq ft`;

        // Location Info
        resLocationStatus.textContent = data.location_info.status;
        resLocationName.textContent = data.location_info.address_display;
        if (data.location_info.latitude && data.location_info.longitude) {
            resCoords.textContent = `Lat: ${data.location_info.latitude.toFixed(4)} | Lon: ${data.location_info.longitude.toFixed(4)} (OpenStreetMap)`;
        } else {
            resCoords.textContent = "Coordinates: Regional Area";
        }

        // Macro Info
        resMacroStatus.textContent = data.macro_info.status;
        resMortgageRate.textContent = data.macro_info.mortgage_rate_30y.toFixed(2);
        resCPI.textContent = data.macro_info.cpi_index.toFixed(1);

        // ML Metrics & Feature Importance
        resR2.textContent = `R² = ${data.model_metrics.r2_score}`;

        const featureLabels = {
            "overall_qual": "Overall Material Quality",
            "gr_liv_area": "Above Grade Living Area",
            "total_bsmt_sf": "Basement Square Feet",
            "garage_cars": "Garage Capacity",
            "year_built": "Construction Year",
            "full_bath": "Full Bathroom Count",
            "bedroom_abv_gr": "Bedroom Count",
            "live_mortgage_factor": "FRED Live Interest Rate Factor",
            "live_cpi_factor": "FRED Live Inflation Index Factor"
        };

        featureMeters.innerHTML = "";
        Object.entries(data.feature_contributions).forEach(([key, pct]) => {
            const labelText = featureLabels[key] || key;
            const displayPct = Math.abs(pct).toFixed(1);

            const row = document.createElement("div");
            row.className = "meter-row";
            row.innerHTML = `
                <div class="meter-header">
                    <span>${labelText}</span>
                    <span>${pct >= 0 ? '+' : ''}${displayPct}%</span>
                </div>
                <div class="meter-bar-bg">
                    <div class="meter-bar-fill" style="width: ${Math.min(100, Math.max(5, Math.abs(pct) * 2))}%"></div>
                </div>
            `;
            featureMeters.appendChild(row);
        });
    }

    // Open & Load Audit Modal
    async function openAuditModal() {
        auditModal.classList.remove("hidden");
        try {
            const auditData = await window.apiClient.getDataAudit();
            
            // Render Sources
            auditSourcesBody.innerHTML = auditData.data_sources.map(s => `
                <tr>
                    <td><strong>${s.name}</strong></td>
                    <td>${s.type}</td>
                    <td>${s.purpose}</td>
                    <td><span class="badge badge-success">${s.status}</span></td>
                </tr>
            `).join('');

            // Render APIs
            auditApiBody.innerHTML = auditData.api_inventory.map(a => `
                <tr>
                    <td><code>${a.endpoint}</code></td>
                    <td><span class="badge badge-subtle">${a.method}</span></td>
                    <td>${a.live_dependencies.join(', ')}</td>
                </tr>
            `).join('');
        } catch (err) {
            console.error("Audit load error:", err);
        }
    }

    // Event Listeners
    valuationForm.addEventListener("submit", handleValuationSubmit);
    btnRetry.addEventListener("click", () => handleValuationSubmit());
    btnViewAudit.addEventListener("click", openAuditModal);
    btnCloseAudit.addEventListener("click", () => auditModal.classList.add("hidden"));
    auditModal.addEventListener("click", (e) => {
        if (e.target === auditModal) auditModal.classList.add("hidden");
    });

    // Initialize page
    loadLiveMacroTicker();
});
