# Automated Testing Framework

## Running Backend Tests

The backend test suite is managed via `pytest`.

```bash
python -m pytest backend/tests -v
```

## Test Coverage Summary

- **`test_health_check`**: Asserts external API connectivity statuses (`LIVE_OK`).
- **`test_live_market_data_endpoint`**: Verifies FRED 30-year rate and CPI response format.
- **`test_geocode_endpoint`**: Tests OpenStreetMap location lookup.
- **`test_predict_endpoint_valid_request`**: Validates ML model valuation output and feature contribution totals.
- **`test_predict_endpoint_schema_validation`**: Confirms HTTP 422 on invalid field bounds.
- **`test_security_headers_present`**: Verifies presence of `X-Frame-Options`, `nosniff`, `CSP`.
- **`test_predict_xss_sanitization`**: Asserts XSS script tags are stripped safely.
- **`test_data_audit_endpoint`**: Validates 100% live data coverage reporting.
