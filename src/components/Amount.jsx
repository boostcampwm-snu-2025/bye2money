// 인자로 스타일(폰트, 너비)도 받을 수 있는 방법 찾기
const Amount = ({ value, readOnly = true, onChange }) => {
    const numericValue = Number(value) || 0;
    const isIncome = numericValue > 0;
    const isZero = numericValue === 0;

    const amountColor = isZero
        ? "text-xl text-gray-800"
        : isIncome
        ? "text-xl text-red-500"
        : "text-xl text-blue-500";

    const formattedValue = `${readOnly && isIncome ? "+" : ""}${Math.abs(
        numericValue
    ).toLocaleString()}`;

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, "");
        if (onChange) {
            onChange(rawValue);
        }
    };

    return readOnly ? (
        // "읽기 전용"
        <span className={amountColor}>{formattedValue}</span>
    ) : (
        // "편집 가능"
        <input
            type="text"
            value={formattedValue}
            onChange={handleChange}
            placeholder="0"
            className="text-xl text-gray-600 w-[120px]"
        />
    );
};

export default Amount;
