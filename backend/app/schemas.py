from typing import List, Optional
from pydantic import BaseModel


class Kpi(BaseModel):
    label: str
    value: str
    delta: Optional[str] = None
    tone: str = "muted"


class TrendPoint(BaseModel):
    month: str
    # arbitrary numeric fields are added via extra="allow"
    model_config = {"extra": "allow"}


class NameValue(BaseModel):
    name: str
    value: float


class FunnelStep(BaseModel):
    label: str
    value: float


class TatStage(BaseModel):
    name: str
    days: float


class Enrollment(BaseModel):
    no: str
    name: str
    sponsor: str
    date: str
    status: str
    officer: str


class ContributionRow(BaseModel):
    sponsor: str
    period: str
    amount: str
    stage: str
    officer: str
    status: str


class LiveClaim(BaseModel):
    no: str
    member: str
    type: str
    stage: str
    officer: str
    tat: str
    sla: str


class OfficerLoad(BaseModel):
    officer: str
    count: int


class UnderRemittance(BaseModel):
    sponsor: str
    amount: str
    months: int


class ActivityItem(BaseModel):
    t: str
    msg: str


class Gauge(BaseModel):
    label: str
    value: float
    tone: str


class CountyHeat(BaseModel):
    name: str
    value: float


class SystemHealth(BaseModel):
    service: str
    status: str
    uptime: str


class OfficerPerformance(BaseModel):
    officer: str
    processed: int
    pending: int
    sla_pct: float


class BenefitsSummary(BaseModel):
    kpis: List[Kpi]
    settlement_rate: float
    payment_queue: List[NameValue]


class FinanceSummary(BaseModel):
    kpis: List[Kpi]
    batches: List[NameValue]
    throughput: List[TrendPoint]
