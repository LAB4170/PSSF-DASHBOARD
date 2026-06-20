# PSSF Dashboard – FastAPI Backend

A FastAPI service that exposes all data consumed by the PSSF Enterprise
Operations Dashboard (membership, contributions, claims, benefits,
finance, analytics, administration).

## Quick start

```bash
cd backend
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Then open:

- Swagger UI:  http://localhost:8000/docs
- ReDoc:       http://localhost:8000/redoc
- OpenAPI:     http://localhost:8000/openapi.json

## Connecting from the dashboard

Set `VITE_API_BASE_URL=http://localhost:8000` in the frontend `.env`
and fetch endpoints such as `/api/kpis`, `/api/claims/live`, etc.

CORS is open by default for local dev. Lock it down in `app/main.py`
before deploying.

## Endpoint map

| Group         | Endpoints                                                                 |
|---------------|---------------------------------------------------------------------------|
| Overview      | `GET /api/kpis`, `GET /api/activity`                                      |
| Membership    | `/api/membership/enrollment-trend`, `/distribution`, `/top-sponsors`, `/recent` |
| Contributions | `/api/contributions/trend`, `/funnel`, `/types`, `/posting-status`, `/under-remittance`, `/recent` |
| Claims        | `/api/claims/trend`, `/funnel`, `/by-type`, `/by-channel`, `/by-stage`, `/tat`, `/live`, `/outstanding-by-officer` |
| Benefits      | `/api/benefits/summary`                                                   |
| Finance       | `/api/finance/summary`                                                    |
| Analytics     | `/api/analytics/county-heat`, `/sla-gauges`                               |
| Admin         | `/api/admin/officers`, `/system-health`                                   |

All endpoints return JSON and currently serve mock data — swap the
`app/data.py` repository for a real DB layer (SQLAlchemy, asyncpg, etc.)
without changing routes or schemas.
