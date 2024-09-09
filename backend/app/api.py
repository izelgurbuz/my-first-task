from fastapi import FastAPI, Depends, HTTPException
from app.models import UserCreate, UserLogin
from app.auth import register_user, authenticate_user, create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

app = FastAPI()

@app.post("/register")
async def register(user: UserCreate):
    user = await register_user(user)
    return {"msg": "User registered successfully", "user": user}

@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(UserLogin(email=form_data.username, password=form_data.password))
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user["_id"])}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
