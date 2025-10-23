# FastAPI 백엔드 서버

## 설치 및 실행

### 1. Python 가상환경 생성 (선택사항이지만 권장)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
# or
venv\Scripts\activate  # Windows
```

### 2. 의존성 설치
```bash
pip install -r requirements.txt
```

### 3. 서버 실행
```bash
uvicorn main:app --reload --port 8000
```

서버가 실행되면 http://localhost:8000 에서 접근 가능합니다.

## API 엔드포인트

### 1. GET /api/expenses
모든 지출 내역 조회

**응답 예시:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "date": "2023. 08. 17",
    "amount": 5000,
    "description": "점심식사",
    "paymentMethod": "card",
    "category": "food",
    "createdAt": "2023-08-17T12:00:00.000000"
  }
]
```

### 2. POST /api/expenses
새로운 지출 생성

**요청 예시:**
```json
{
  "date": "2023. 08. 17",
  "amount": 5000,
  "description": "점심식사",
  "paymentMethod": "card",
  "category": "food"
}
```

**응답 예시:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "date": "2023. 08. 17",
  "amount": 5000,
  "description": "점심식사",
  "paymentMethod": "card",
  "category": "food",
  "createdAt": "2023-08-17T12:00:00.000000"
}
```

## API 문서

FastAPI는 자동으로 API 문서를 생성합니다:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
