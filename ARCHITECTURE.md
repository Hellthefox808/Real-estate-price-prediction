# Architecture Documentation

## System Architectural Diagram

```
+-------------------------------------------------------------------+
|                   Presentation Layer (Frontend)                  |
|  - Index HTML Dashboard                                           |
|  - Live Ticker Controller & Skeletons                             |
|  - Typed REST Client (api.js)                                     |
+-------------------------------------------------------------------+
                                  |
                                  | HTTPS / JSON (Pydantic Encapsulated)
                                  v
+-------------------------------------------------------------------+
|                    Application Layer (FastAPI)                    |
|  - Security & Rate Limit Middleware (30 req/min/IP)              |
|  - Input Validation & XSS Tag Sanitizer (Pydantic v2)             |
|  - Health & Data Audit Reporting Controllers                      |
+-------------------------------------------------------------------+
                   |                                  |
                   v                                  v
+-------------------------------+  +--------------------------------+
|    Live Data Layer (Clients)  |  |    Machine Learning Engine     |
| - LiveAPIClient               |  | - GradientBoostingRegressor    |
| - In-Memory TTL Cache Manager |  | - Macroeconomic Adjuster       |
| - Exponential Backoff Retries |  | - Feature Importance Analyzer  |
+-------------------------------+  +--------------------------------+
          |            |
          v            v
  [ FRED API ]   [ OpenStreetMap ]
```

## Resilience & Caching Architecture

1. **In-Memory TTL Caching**:
   - Macroeconomic FRED data cached for 3,600 seconds.
   - Geocoding results cached for 86,400 seconds.
2. **Exponential Backoff**:
   - HTTP requests retry up to 3 times with $0.5s \times 2^{attempt-1}$ sleep intervals.
3. **Pydantic Data Contracts**:
   - Prevents invalid data propagation across execution layers.
