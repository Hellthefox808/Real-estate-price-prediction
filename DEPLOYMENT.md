# Production Deployment Manual

## Docker Deployment (Recommended)

1. **Build Container Image:**
   ```bash
   docker build -t realestate-ml-engine:latest .
   ```
2. **Run Container:**
   ```bash
   docker run -d -p 8000:8000 --name realestate-app realestate-ml-engine:latest
   ```
3. **Verify Service Health:**
   ```bash
   curl http://localhost:8000/health
   ```

## Docker Compose Setup

Run entire stack via Docker Compose:
```bash
docker-compose up --build -d
```

## Cloud Deployment Options

- **AWS ECS / App Runner**: Deploy the built Docker container targeting port `8000`.
- **GCP Cloud Run**: Deploy image with `--port 8000` and minimum 1 instance.
- **Vercel / Cloudflare Pages**: Host `/frontend` static assets connected to backend API URL.
