/**
 * Production API Client for Real Estate Prediction Engine
 * Handles REST requests to FastAPI backend with timeout, retry, and error objects.
 */
class RealEstateAPI {
    constructor(baseURL = "") {
        this.baseURL = baseURL;
        this.timeout = 8000; // 8 second client timeout
    }

    async _request(endpoint, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const config = {
                ...options,
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
            };

            const response = await fetch(`${this.baseURL}${endpoint}`, config);
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                const detailMsg = errData.detail || `Server returned HTTP ${response.status}`;
                throw new Error(detailMsg);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
                throw new Error("Request timed out after 8 seconds. Please try again.");
            }
            throw error;
        }
    }

    async getHealth() {
        return this._request("/health");
    }

    async getLiveMarketData() {
        return this._request("/api/v1/live-market-data");
    }

    async geocodeLocation(query) {
        return this._request(`/api/v1/geocode?query=${encodeURIComponent(query)}`);
    }

    async calculateValuation(propertyData) {
        return this._request("/api/v1/predict", {
            method: "POST",
            body: JSON.stringify(propertyData),
        });
    }

    async getDataAudit() {
        return this._request("/api/v1/audit");
    }
}

// Export singleton instance
window.apiClient = new RealEstateAPI();
