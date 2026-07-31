# REST API Reference Manual

Base URL: `http://localhost:8000` (Local) / `https://api.realestate-ml.org` (Production)

## Endpoints

### 1. Calculate Property Valuation
- **URL:** `/api/v1/predict`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Request Body:**
  ```json
  {
    "overall_qual": 8,
    "gr_liv_area": 2100.0,
    "total_bsmt_sf": 1100.0,
    "garage_cars": 2,
    "year_built": 2016,
    "full_bath": 2,
    "bedroom_abv_gr": 3,
    "location_query": "Austin, TX"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "estimated_price": 625549.89,
    "price_range_low": 584889.15,
    "price_range_high": 666210.63,
    "price_per_sqft": 284.34,
    "location_info": {
      "address_display": "Austin, Travis County, Texas, United States",
      "latitude": 30.2672,
      "longitude": -97.7431,
      "status": "LIVE_OK"
    },
    "macro_info": {
      "mortgage_rate_30y": 6.66,
      "cpi_index": 332.568,
      "status": "LIVE_OK"
    },
    "feature_contributions": {
      "overall_qual": 71.12,
      "gr_liv_area": 19.36
    },
    "model_metrics": {
      "r2_score": 0.9616,
      "rmse": 20581.24
    }
  }
  ```

### 2. Fetch Live Market Data
- **URL:** `/api/v1/live-market-data`
- **Method:** `GET`
- **Response (200 OK):** Returns 30-Year Mortgage Rate & CPI index.

### 3. Geocode Location
- **URL:** `/api/v1/geocode?query=Seattle, WA`
- **Method:** `GET`

### 4. Data Audit Summary
- **URL:** `/api/v1/audit`
- **Method:** `GET`

### 5. System Health Check
- **URL:** `/health`
- **Method:** `GET`
