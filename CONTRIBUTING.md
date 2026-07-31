# Contributing to Real Estate Price Prediction Engine

Thank you for your interest in contributing to the **Real Estate Price Prediction Engine & Live API System**! We welcome contributions from open-source developers, data scientists, security researchers, and software engineers.

## Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](file:///c:/Users/ravir/Desktop/PROJECT/Project/FINAL%20YEAR%20PROJECT%27S/oooppiii/Real-Estate-Price-Prediction-Using-Machine-Learning-Project-main/CODE_OF_CONDUCT.md).

## How to Contribute

### 1. Reporting Bugs
- Check existing GitHub Issues to avoid duplicates.
- Submit a detailed issue including OS, Python version, steps to reproduce, and expected vs actual behavior.

### 2. Feature Requests
- Describe the feature, its business use case, and suggested API or UI implementations.

### 3. Pull Request Process
1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
2. Set up local development environment:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Run the automated test suite:
   ```bash
   python -m pytest backend/tests
   ```
4. Commit your changes following conventional commit standards (`feat: add redis cache manager`, `fix: sanitize location query`).
5. Push to your branch and open a Pull Request targeting `main`.

## Quality Gates for Pull Requests

PRs will only be merged if:
- [x] Automated pytest test suite passes 100%.
- [x] No security regressions or SAST/SCA vulnerabilities introduced.
- [x] Code strictly adheres to PEP 8 standards and Pydantic v2 validation.
- [x] Zero mock or fabricated production data introduced.
