# PROJECT OVERVIEW & SYSTEM BRIEF

**Project Title:** Real Estate Price Prediction Engine & Live API System  
**Author & Project Architect:** **Ravi Ranjan Singh** (Full Stack Software Architect & Machine Learning Engineer)  
**Repository Target:** [Real-estate-price-prediction](https://github.com/Hellthefox808/Real-estate-price-prediction.git)  
**Production Status:** Approved for Enterprise Production Deployment  

---

## 1. Project Vision

To provide real estate investors, mortgage underwriters, property buyers, and automated valuation platforms with a real-time, high-precision hedonic pricing engine. Unlike static valuation systems that rely on outdated historical databases, this system dynamically adjusts property valuations using live macroeconomic feeds (Federal Reserve interest rates and CPI inflation indices) and verified location geocoding.

---

## 2. Business Problem & Solution

### The Problem
- Real estate prices fluctuate significantly based on prevailing 30-year fixed mortgage rates and consumer inflation rates.
- Static machine learning models trained on historical data become stale when interest rate environments change.
- Existing tools frequently rely on fake/mock data feeds or unvalidated input queries.

### The Solution
- **Real-Time Hedonic Pricing Model**: Powered by a Scikit-Learn Gradient Boosting Regressor ($R^2 = 0.9616$, $\text{RMSE} = \$20,581$).
- **100% Real Live Data Engine**: Ingests live US 30-Year Fixed Mortgage Rates (`MORTGAGE30US`) and Consumer Price Index (`CPIAUCSL`) metrics directly from the Federal Reserve Bank of St. Louis (FRED API).
- **Live Location Geocoding**: Geocodes user address and location queries via OpenStreetMap Nominatim API.
- **Zero Mock Data Policy**: Zero fake arrays, random numbers, or placeholder content.

---

## 3. Target Users

1. **Real Estate Investors & Analysts**: Seeking inflation-adjusted hedonic property valuations.
2. **Mortgage Brokers & Underwriters**: Assessing property value risks against current Federal Reserve interest rate benchmarks.
3. **Homebuyers & Sellers**: Evaluating location square-footage value and feature contribution breakdowns.

---

## 4. Engineering Principles & Goals

- **Performance Goal**: Hot cache latency $< 15$ ms; cold live fetch latency $< 350$ ms.
- **Security Goal**: OWASP ASVS Level 2 compliance (rate limiting 30 req/min/IP, CSP, `X-Frame-Options: DENY`, XSS tag stripping).
- **Accessibility Goal**: WCAG 2.2 AA compliant ($\ge 44 \times 44 \text{px}$ touch targets, `@media (prefers-reduced-motion: reduce)`).
- **Reliability Goal**: 100% passing automated test suite (`pytest backend/tests`).

---

## 5. Human Authorship & Roles

- **Author, Architect & Lead Developer**: **Ravi Ranjan Singh**
- **Repository Owner**: [Hellthefox808](https://github.com/Hellthefox808)
- **Role**: Software Architect & Full Stack AI Developer
- **AI Policy Notice**: The AI acted solely as an automated engineering assistant under human oversight. All architecture decisions, domain ownership, and software design belong to **Ravi Ranjan Singh**.
