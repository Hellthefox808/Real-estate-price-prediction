# Environment Variables & Configuration

The application is designed to run securely out of the box using public open data endpoints (FRED & OpenStreetMap).

## Optional Environment Configuration

| Variable | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `PORT` | ASGI server port | `8000` | No |
| `HOST` | Binding address | `127.0.0.1` | No |
| `ENVIRONMENT` | Environment type (`development`, `production`) | `production` | No |
| `CORS_ORIGINS` | Allowed CORS origins (comma separated) | `*` | No |
| `REQUEST_TIMEOUT` | External API request timeout (seconds) | `5.0` | No |
