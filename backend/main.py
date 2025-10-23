from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
import uuid
import json
import os
from pathlib import Path

app = FastAPI()

# CORS 설정 (프론트엔드에서 접근 가능하도록)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite 기본 포트
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터 모델
class ExpenseCreate(BaseModel):
    date: str
    amount: int
    description: str
    paymentMethod: str
    category: str

class Expense(ExpenseCreate):
    id: str
    createdAt: str

# JSON 파일 경로
DATA_FILE = Path(__file__).parent / "expenses.json"

# JSON 파일에서 데이터 로드
def load_expenses() -> List[Expense]:
    if DATA_FILE.exists():
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return [Expense(**item) for item in data]
    return []

# JSON 파일에 데이터 저장
def save_expenses(expenses: List[Expense]):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump([expense.model_dump() for expense in expenses], f, ensure_ascii=False, indent=2)

# 서버 시작 시 데이터 로드
expenses_db: List[Expense] = load_expenses()

@app.get("/")
def read_root():
    return {"message": "Expense Tracker API"}

# 경로 1: 모든 지출 조회
@app.get("/api/expenses", response_model=List[Expense])
def get_expenses():
    return expenses_db

# 경로 2: 새 지출 생성
@app.post("/api/expenses", response_model=Expense, status_code=201)
def create_expense(expense: ExpenseCreate):
    new_expense = Expense(
        id=str(uuid.uuid4()),
        date=expense.date,
        amount=expense.amount,
        description=expense.description,
        paymentMethod=expense.paymentMethod,
        category=expense.category,
        createdAt=datetime.now().isoformat()
    )
    expenses_db.append(new_expense)
    save_expenses(expenses_db)  # JSON 파일에 저장
    return new_expense
