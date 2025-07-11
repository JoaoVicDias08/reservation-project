from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.user import User
from auth.password_handler import hash_password, verify_password
from auth.jwt_handler import create_access_token
from pydantic import BaseModel
from auth.dependencies import get_current_user

# Criando o router
router = APIRouter()

# Função que abre uma conexão com o banco:
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Modelo de dados para receber o email e senha:
class UserCreate(BaseModel):
    email: str
    password: str

# Rota de cadastro
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email já registrado.")

    new_user = User(
        email=user.email,
        hashed_password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Usuário criado com sucesso!"}

# Rota de login
@router.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    print("Tentando login com email:", user.email)
    db_user = db.query(User).filter(User.email == user.email).first()
    print("Usuário encontrado no DB:", db_user)
    
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Email ou senha incorretos.")

    token = create_access_token({"sub": db_user.email})
    print("Token criado:", token)
    return {"access_token": token, "token_type": "bearer"}


# Rota protegida: perfil do usuário
@router.get("/perfil")
def perfil(usuario: str =  Depends(get_current_user)):
    return {"message": f"Bem-vindo, {usuario}!"}