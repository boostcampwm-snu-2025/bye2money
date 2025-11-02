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
    type: str = "expense"  # 기본값 expense

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

# 경로 3: 지출 삭제
@app.delete("/api/expenses/{expense_id}")
def delete_expense(expense_id: str):
    global expenses_db

    # 해당 ID의 지출 찾기
    expense_index = None
    for i, expense in enumerate(expenses_db):
        if expense.id == expense_id:
            expense_index = i
            break

    if expense_index is None:
        raise HTTPException(status_code=404, detail="Expense not found")

    # 삭제
    deleted_expense = expenses_db.pop(expense_index)
    save_expenses(expenses_db)  # JSON 파일에 저장

    return {"message": "Expense deleted successfully", "id": expense_id}

# 경로 4: 지출 수정
@app.put("/api/expenses/{expense_id}", response_model=Expense)
def update_expense(expense_id: str, expense: ExpenseCreate):
    global expenses_db

    # 해당 ID의 지출 찾기
    expense_index = None
    for i, exp in enumerate(expenses_db):
        if exp.id == expense_id:
            expense_index = i
            break

    if expense_index is None:
        raise HTTPException(status_code=404, detail="Expense not found")

    # 기존 지출의 createdAt 유지하면서 업데이트
    updated_expense = Expense(
        id=expense_id,
        date=expense.date,
        amount=expense.amount,
        description=expense.description,
        paymentMethod=expense.paymentMethod,
        category=expense.category,
        createdAt=expenses_db[expense_index].createdAt
    )

    expenses_db[expense_index] = updated_expense
    save_expenses(expenses_db)  # JSON 파일에 저장

    return updated_expense
