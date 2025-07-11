from fastapi import FastAPI
from routes import auth
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from models import user, reservation  # importa ambos
from routes import reservation

app = FastAPI()

# Cria as tabelas do banco (users, etc)
Base.metadata.create_all(bind=engine)

# Registra as rotas
app.include_router(auth.router)

app.include_router(reservation.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ou onde seu frontend estiver rodando
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)