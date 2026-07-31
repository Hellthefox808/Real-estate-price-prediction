import sys
import os
import pytest
from fastapi.testclient import TestClient

# Add parent backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["backend_status"] == "healthy"
    assert "fred_api_status" in data
    assert "openstreetmap_api_status" in data


def test_live_market_data_endpoint():
    response = client.get("/api/v1/live-market-data")
    assert response.status_code == 200
    data = response.json()
    assert "mortgage_rate_30y" in data
    assert isinstance(data["mortgage_rate_30y"], float)
    assert data["mortgage_rate_30y"] > 0.0
    assert "cpi_index" in data
    assert "data_source" in data


def test_geocode_endpoint():
    response = client.get("/api/v1/geocode?query=Seattle, WA")
    assert response.status_code == 200
    data = response.json()
    assert "address_display" in data
    assert data["status"] in ["LIVE_OK", "CACHED", "UNAVAILABLE"]


def test_predict_endpoint_valid_request():
    payload = {
        "overall_qual": 8,
        "gr_liv_area": 2100.0,
        "total_bsmt_sf": 1200.0,
        "garage_cars": 2,
        "year_built": 2015,
        "full_bath": 2,
        "bedroom_abv_gr": 3,
        "location_query": "Austin, TX"
    }
    response = client.post("/api/v1/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "estimated_price" in data
    assert data["estimated_price"] > 0
    assert data["price_range_low"] < data["estimated_price"]
    assert data["price_range_high"] > data["estimated_price"]
    assert "location_info" in data
    assert "macro_info" in data
    assert "feature_contributions" in data
    assert "model_metrics" in data
    assert data["model_metrics"]["r2_score"] > 0.5


def test_predict_endpoint_schema_validation():
    # Invalid overall quality (outside 1-10 range)
    invalid_payload = {
        "overall_qual": 15,
        "gr_liv_area": 2000.0,
        "total_bsmt_sf": 1000.0,
        "garage_cars": 2,
        "year_built": 2020,
        "full_bath": 2,
        "bedroom_abv_gr": 3,
        "location_query": "Chicago, IL"
    }
    response = client.post("/api/v1/predict", json=invalid_payload)
    assert response.status_code == 422  # Unprocessable Entity (Validation Error)


def test_security_headers_present():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.headers.get("X-Frame-Options") == "DENY"
    assert response.headers.get("X-Content-Type-Options") == "nosniff"
    assert response.headers.get("X-XSS-Protection") == "1; mode=block"
    assert "Content-Security-Policy" in response.headers


def test_predict_xss_sanitization():
    payload = {
        "overall_qual": 8,
        "gr_liv_area": 2000.0,
        "total_bsmt_sf": 1000.0,
        "garage_cars": 2,
        "year_built": 2015,
        "full_bath": 2,
        "bedroom_abv_gr": 3,
        "location_query": "<script>alert('xss')</script>Miami, FL"
    }
    response = client.post("/api/v1/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    # Ensure script tags were stripped safely
    assert "<script>" not in data["location_info"]["address_display"]


def test_data_audit_endpoint():
    response = client.get("/api/v1/audit")
    assert response.status_code == 200
    data = response.json()
    assert data["live_data_coverage_pct"] == 100.0
    assert data["mock_data_usage_pct"] == 0.0
    assert len(data["data_sources"]) >= 3

