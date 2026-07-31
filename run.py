#!/usr/bin/env python3
"""
Real Estate Price Prediction Platform — Single Command Launcher
Authored by: Ravi Ranjan Singh
"""

import os
import sys
import subprocess

def main():
    print("=" * 60)
    print(" Real Estate Price Prediction Platform")
    print(" Created by Ravi Ranjan Singh")
    print("=" * 60)

    # Ensure backend directory is in python path
    backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend")
    sys.path.insert(0, backend_dir)
    os.environ["PYTHONPATH"] = backend_dir

    port = 8000
    host = "127.0.0.1"

    print(f"\n[+] Starting FastAPI server on http://{host}:{port}")
    print(f"[+] Open http://{host}:{port} in your web browser to view the dashboard.\n")

    try:
        import uvicorn
        uvicorn.run("app.main:app", host=host, port=port, reload=True)
    except KeyboardInterrupt:
        print("\n[!] Application stopped cleanly.")
    except Exception as e:
        print(f"\n[!] Error launching application: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
