from pydantic import BaseModel, Field, field_validator
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone


class PredictionRequest(BaseModel):
    overall_qual: int = Field(..., ge=1, le=10, description="Overall material and finish quality (1-10)")
    gr_liv_area: float = Field(..., gt=0, le=15000, description="Above grade living area square feet")
    total_bsmt_sf: float = Field(..., ge=0, le=10000, description="Total square feet of basement area")
    garage_cars: int = Field(..., ge=0, le=10, description="Size of garage in car capacity")
    year_built: int = Field(..., ge=1800, le=2026, description="Original construction date")
    full_bath: int = Field(..., ge=0, le=10, description="Full bathrooms above grade")
    bedroom_abv_gr: int = Field(..., ge=0, le=20, description="Bedrooms above grade")
    location_query: str = Field(..., min_length=2, max_length=200, description="City, State, Zip, or Address for live geocoding")

    @field_validator('location_query')
    def clean_location(cls, v: str) -> str:
        cleaned = v.strip()
        if not cleaned:
            raise ValueError("Location query cannot be empty or whitespace only")
        # Strip potential script/HTML tags to prevent XSS vectoring (CWE-79 / OWASP A03)
        import re
        sanitized = re.sub(r'<[^>]*>', '', cleaned)
        if len(sanitized) < 2:
            raise ValueError("Location query contains invalid characters or script tags")
        return sanitized



class LocationData(BaseModel):
    address_display: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    place_type: Optional[str] = "Unknown"
    status: str = Field("LIVE_OK", description="Status: LIVE_OK, CACHED, UNAVAILABLE")
    last_updated: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class MacroEconomicData(BaseModel):
    mortgage_rate_30y: float = Field(..., description="Live 30-Year Fixed Rate Mortgage Average (%)")
    cpi_index: float = Field(..., description="Live Consumer Price Index (FRED)")
    economic_sentiment: str = Field("Stable", description="Economic market sentiment indicator")
    effective_date: str
    data_source: str = "FRED API (Federal Reserve Bank of St. Louis)"
    status: str = Field("LIVE_OK", description="Status: LIVE_OK, CACHED, UNAVAILABLE")
    last_updated: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class PredictionResponse(BaseModel):
    estimated_price: float
    price_range_low: float
    price_range_high: float
    price_per_sqft: float
    location_info: LocationData
    macro_info: MacroEconomicData
    feature_contributions: Dict[str, float]
    model_metrics: Dict[str, float]
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class APIHealthStatus(BaseModel):
    backend_status: str = "healthy"
    fred_api_status: str
    openstreetmap_api_status: str
    live_data_engine: str = "active"
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class DataAuditReport(BaseModel):
    data_sources: List[Dict[str, Any]]
    api_inventory: List[Dict[str, Any]]
    live_data_coverage_pct: float
    mock_data_usage_pct: float
    caching_status: str
    error_handling_compliance: str
    security_review: str
    audit_timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

