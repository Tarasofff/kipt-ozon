#!/bin/bash
./certs/jwt.bat

alembic upgrade head

python -m app.db.seeders.seed_run

uvicorn app.main:app --reload
# uvicorn app.main:app --host 0.0.0.0 --port 8000
