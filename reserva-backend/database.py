from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Conexão com banco SQLite (ou substitua pelo seu URL do banco real)
SQLALCHEMY_DATABASE_URL = "sqlite:///./reservas.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()

# Esta função estava faltando!
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
