# Product & Engineering Roadmap

The roadmap outlines planned milestones for the Real Estate Price Prediction Engine.

## Phase 1: Core Live Engine & Security Hardening (v1.0 - Completed)
- [x] Live FRED Economic Data REST client (Mortgage rates & CPI).
- [x] Live OpenStreetMap Nominatim Geocoding integration.
- [x] Gradient Boosting ML Valuation Model ($R^2 = 0.9616$).
- [x] OWASP ASVS Level 2 Security Headers & Rate Limiter.
- [x] Automated Pytest Test Suite (100% pass rate).

## Phase 2: Enterprise Scaling & Distributed Architecture (v1.1 - Upcoming)
- [ ] **Distributed Redis Caching**: Replace in-memory TTL dictionary with multi-region Redis cluster.
- [ ] **LLM Natural Language Valuation Narratives**: Generate automated AI summary reports explaining property valuation trends to buyers.
- [ ] **Zillow / Realty Public Market Data Connector**: Incorporate live comparable sale listings (Comps) into hedonic model.

## Phase 3: Spatial ML & Multi-Region Support (v2.0 - Future)
- [ ] **Geospatial Neural Networks**: Incorporate raster satellite imagery for amenity density scoring.
- [ ] **International Real Estate APIs**: Support UK Land Registry and Eurostat housing market data streams.
