# Real Estate Price Prediction Platform

> Real-time property price valuation using Machine Learning, live Federal Reserve interest rates, and OpenStreetMap location data.

[![Python Version](https://img.shields.io/badge/python-3.11%20%7C%203.12%20%7C%203.13-blue.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build Status](https://github.com/Hellthefox808/Real-estate-price-prediction/actions/workflows/ci.yml/badge.svg)](https://github.com/Hellthefox808/Real-estate-price-prediction/actions)
[![Live Data](https://img.shields.io/badge/Data-100%25%20Live%20API-brightgreen.svg)](DATA_AUDIT_REPORT.md)

---

![Real Estate Platform Banner](assets/hero_banner.jpg)

**Created & Maintained by:** **Ravi Ranjan Singh**  
**Repository:** [github.com/Hellthefox808/Real-estate-price-prediction](https://github.com/Hellthefox808/Real-estate-price-prediction.git)  

---

## 👋 Welcome & Overview

Welcome! I designed and built this **Real Estate Price Prediction Platform** to solve a real-world problem in property valuation.

Most housing market prediction models rely on static, historical datasets. When interest rates rise or inflation shifts, static models quickly become out of date. To fix this, I created a machine learning system that combines a **Gradient Boosting valuation model** with **live external APIs**:

1. **FRED (Federal Reserve Bank of St. Louis)**: Ingests current 30-year fixed mortgage rates and CPI inflation indices live.
2. **OpenStreetMap Nominatim**: Geocodes address and city queries to real geographical coordinates in real-time.

---

## ⚡ What Makes This Project Special?

- **100% Real Live Data**: No hardcoded arrays, random numbers, or fake statistics. Every valuation uses real-time market data.
- **Smart Economic Adjustments**: Automatically factors in how rising or falling mortgage interest rates affect real homebuying power.
- **Explainable Predictions**: Displays a breakdown of feature contributions (e.g. square footage, quality rating, interest rate impact).
- **Fast & Resilient**: Built-in TTL caching (1-hour macro data, 24-hour geocoding) means repeat queries return in under **15ms**.
- **Clean & Accessible UI**: Responsive dark theme dashboard built with keyboard focus support, screen reader attributes, and smooth loading skeletons.

---

## 📸 Interface Preview

![Dashboard Visualization Preview](assets/dashboard_preview.jpg)

---

## 📐 How It Works (Architecture)

```
[ Web Dashboard ] ──► [ FastAPI Server ] ──► [ Security & Rate Limiter ]
                             │
                             ├────► [ In-Memory TTL Cache ]
                             │
                             ├────► [ FRED API ] (Live Interest Rates & CPI)
                             ├────► [ OpenStreetMap ] (Live Geocoding)
                             │
                             └────► [ Gradient Boosting ML Model ]
                                       └──► Final Property Estimate + Breakdown
```

---

## 🛠️ Tech Stack

- **Backend**: Python 3.11+, FastAPI, Uvicorn ASGI Server
- **Machine Learning**: Scikit-Learn (Gradient Boosting Regressor), Pandas, NumPy
- **Live Data APIs**: FRED Economic Data API, OpenStreetMap Nominatim API
- **Frontend**: HTML5, Vanilla JavaScript, HSL Tokenized CSS3 Design System
- **Security & Quality**: Pydantic v2 validation, IP rate limiting, Pytest test suite
- **DevOps**: Docker, Docker Compose, GitHub Actions CI/CD

---

## 🚀 Quick Start Guide

### Option 1: Run with Python (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hellthefox808/Real-estate-price-prediction.git
   cd Real-estate-price-prediction
   ```

2. **Install requirements:**
   ```bash
   pip install -r backend/requirements.txt
   ```

3. **Launch the application:**
   ```bash
   python run.py
   ```
   Open `http://localhost:8000` in your browser.

---

### Option 2: Run with Docker Compose

```bash
docker-compose up --build -d
```
The app will launch on `http://localhost:8000`.

---

## 🧪 Running Automated Tests

You can run the full test suite anytime with pytest:

```bash
python -m pytest backend/tests -v
```

**Test Status:** All 8 test cases pass cleanly in under 4 seconds.

---

## 📖 Project Documentation

I have documented every part of the architecture, security audit, and data policy in dedicated guides:

- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) — Project vision, goals, and business solution
- [DATA_AUDIT_REPORT.md](DATA_AUDIT_REPORT.md) — 11-section live data audit report
- [SECURITY_AUDIT_REPORT.md](SECURITY_AUDIT_REPORT.md) — Security assessment & OWASP compliance
- [ARCHITECTURE.md](ARCHITECTURE.md) — System data flow & architecture breakdown
- [API.md](API.md) — REST API endpoint documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) — Production deployment guide
- [TESTING.md](TESTING.md) — Test suite documentation

---

## 🤝 Contributing & License

Contributions, bug reports, and feature suggestions are always welcome! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author & Contact

**Ravi Ranjan Singh**  
*Software Architect & Developer*  

- **GitHub**: [github.com/Hellthefox808](https://github.com/Hellthefox808)  
- **Repository**: [Real-estate-price-prediction](https://github.com/Hellthefox808/Real-estate-price-prediction.git)  
- **Email**: `security@realestate-ml.org`  
