// 인자로 스타일(폰트, 너비)도 받을 수 있는 방법 찾기
const Amount = ({ value, readOnly = true, onChange }) => {
    const numericValue = Number(value) || 0;
    const isIncome = numericValue > 0;
    const isZero = numericValue === 0;
    // style
    const baseFontStyle = "text-xl";
    const variantFontStyle = isZero
        ? "text-gray-800"
        : isIncome
        ? "text-red-500"
        : "text-blue-500";

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
        <span className={`${baseFontStyle} ${variantFontStyle}`}>
            {formattedValue}
        </span>
    ) : (
        // "편집 가능"
        <input
            type="text"
            value={formattedValue}
            onChange={handleChange}
            placeholder="0"
            className="text-xl text-right font-semibold text-black w-[120px]"
        />
    );
};

export default Amount;
