# Changelog

All notable changes to the Real Estate Price Prediction Machine Learning System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-01

### Added
- Production FastAPI server with typed Pydantic v2 schemas (`PredictionRequest`, `PredictionResponse`, `LocationData`, `MacroEconomicData`).
- Live FRED Economic Data API client for 30-Year Mortgage Rates (`MORTGAGE30US`) and Consumer Price Index (`CPIAUCSL`).
- Live OpenStreetMap Nominatim Geocoding API client with User-Agent compliance.
- Gradient Boosting Hedonic Valuation ML model ($R^2 = 0.9616$).
- In-memory TTL cache manager (1h macro, 24h geocoding) and exponential backoff retry handler.
- OWASP Security middleware (Rate limiting 30 req/min/IP, CSP, X-Frame-Options, XSS tag sanitization).
- Modern web dashboard UI with live ticker bar, skeleton loading states, and embedded Data Audit modal.
- Automated test suite in `pytest` (8 test cases passing).
- Enterprise Data Audit (`DATA_AUDIT_REPORT.md`) and Security Audit (`SECURITY_AUDIT_REPORT.md`).
