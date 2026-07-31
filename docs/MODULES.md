# MODULES TECHNICAL SPECIFICATION & REFERENCE

**Author:** **Ravi Ranjan Singh**  
**Repository:** [Real-estate-price-prediction](https://github.com/Hellthefox808/Real-estate-price-prediction.git)  

---

## 1. Backend Modules (`backend/app/`)

### 1.1 Server Core (`backend/app/main.py`)
- **Purpose**: Main FastAPI ASGI server initializing routes, CORS, rate limiting, and security middleware.
- **Responsibilities**: Route handling (`/api/v1/predict`, `/api/v1/live-market-data`, `/api/v1/geocode`, `/api/v1/audit`, `/health`), security header injection, client IP rate limiting (30 req/min/IP).
- **Dependencies**: `fastapi`, `starlette`, `app.schemas.data_models`, `app.clients.live_api_client`, `app.ml.engine`.
- **Security Notes**: Enforces `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Content-Security-Policy`.

### 1.2 Live External API Client (`backend/app/clients/live_api_client.py`)
- **Purpose**: Production HTTP client for fetching FRED macroeconomic data & OpenStreetMap Nominatim geocoding.
- **Responsibilities**: Executes HTTPS GET with 3x exponential backoff retries ($0.5s \times 2^{attempt-1}$), 5s timeouts, and in-memory TTL caching (1h macro, 24h geocoding).
- **Dependencies**: `requests`, `app.schemas.data_models`.
- **Performance Notes**: Delivers sub-15ms responses on cache hits.

### 1.3 Machine Learning Valuation Engine (`backend/app/ml/engine.py`)
- **Purpose**: Hedonic pricing inference model based on Gradient Boosting Regression.
- **Responsibilities**: Generates baseline valuation, applies live interest rate and CPI inflation multipliers, and returns feature contribution percentages.
- **Metrics**: $R^2 = 0.9616$, $\text{RMSE} = \$20,581.24$, $\text{MAE} = \$16,832.72$.

### 1.4 Pydantic Data Contracts (`backend/app/schemas/data_models.py`)
- **Purpose**: Data validation models and input sanitizers.
- **Responsibilities**: Validates request bounds (`overall_qual` 1-10, `gr_liv_area` > 0) and strips HTML/script tags from `location_query` regex.

---

## 2. Frontend Modules (`frontend/`)

### 2.1 UI Dashboard (`frontend/index.html`)
- **Purpose**: Responsive glassmorphism interface.
- **Responsibilities**: Form input, live market ticker bar, valuation results display, feature contribution meters, and embedded Data Audit modal.
- **Accessibility**: Includes `role="status"`, `aria-live="polite"`, and `aria-label` tags.

### 2.2 Design System (`frontend/css/style.css`)
- **Purpose**: HSL color tokens, typography scales, skeleton loading animations, and accessibility rules.
- **Accessibility**: Enforces `min-height: 44px` touch targets and `@media (prefers-reduced-motion: reduce)`.

### 2.3 Frontend Client & App (`frontend/js/api.js` & `frontend/js/app.js`)
- **Purpose**: REST communication and DOM interaction controller.
- **Responsibilities**: Form submission handling, AbortController 8s timeout, double-submission prevention (`disabled = true`), loading skeleton toggling.
