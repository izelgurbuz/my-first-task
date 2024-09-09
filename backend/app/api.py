from fastapi import FastAPI, Depends, HTTPException
from app.models import UserCreate, UserLogin
from app.auth import register_user, authenticate_user, create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development. In production, you should specify domains.
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)
@app.post("/register")
async def register(user: UserCreate):
    try:
        user = await register_user(user)
        access_token = create_access_token(data={"sub": str(user["_id"])})
        return {"msg": "User registered successfully", "access_token": access_token}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
async def login(userdata: UserLogin):
    try:
        user = await authenticate_user(UserLogin(email=userdata.email, password=userdata.password))
        user["_id"] = str(user["_id"])
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": str(user["_id"])}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
