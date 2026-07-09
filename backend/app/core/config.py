import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PSSF Operations API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Optional Database config for future
    # DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    
    class Config:
        env_file = ".env"

settings = Settings()
