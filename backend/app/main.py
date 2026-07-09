from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import dashboard, membership, contributions, claims, departments

app = FastAPI(
    title="PSSF Operations API",
    description="Backend for the PSSF Enterprise Operations Dashboard "
                "(membership, contributions, claims, benefits, finance, analytics, administration).",
    version="1.0.0",
)

# Open CORS for dev — restrict to your dashboard origin in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(dashboard.router)
app.include_router(membership.router)
app.include_router(contributions.router)
app.include_router(claims.router)
app.include_router(departments.router)

# ---------- Health ----------
@app.get("/", tags=["meta"])
def root():
    return {"service": "pssf-operations-api", "status": "ok", "docs": "/docs"}

@app.get("/health", tags=["meta"])
def health():
    return {"status": "healthy"}
