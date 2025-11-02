import json
from pathlib import Path

# JSON 파일 경로
DATA_FILE = Path(__file__).parent / "expenses.json"

# 데이터 로드
with open(DATA_FILE, "r", encoding="utf-8") as f:
    expenses = json.load(f)

# 데이터 정리
cleaned_expenses = []
for expense in expenses:
    # amount가 0이거나 빈 description은 제외
    if expense.get("amount", 0) == 0 or not expense.get("description", "").strip():
        continue

    # type 필드 추가 (amount가 양수면 income, 음수면 expense)
    if "type" not in expense:
        expense["type"] = "income" if expense["amount"] > 0 else "expense"

    # amount를 항상 양수로 변경
    expense["amount"] = abs(expense["amount"])

    # 영어 카테고리를 한글로 변환
    category_mapping = {
        "food": "식비",
        "transport": "교통",
        "shopping": "쇼핑/뷰티",
        "etc": "미분류",
        "card": "카드",
        "cash": "현금",
        "": ""
    }

    if expense.get("category") in category_mapping:
        expense["category"] = category_mapping[expense["category"]]

    # 영어 결제수단을 한글로 변환
    payment_mapping = {
        "card": "카드",
        "cash": "현금",
        "transfer": "계좌이체",
        "": ""
    }

    if expense.get("paymentMethod") in payment_mapping:
        expense["paymentMethod"] = payment_mapping[expense["paymentMethod"]]

    cleaned_expenses.append(expense)

# 정리된 데이터 저장
with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(cleaned_expenses, f, ensure_ascii=False, indent=2)

print(f"정리 완료! {len(cleaned_expenses)}개의 내역이 남았습니다.")
