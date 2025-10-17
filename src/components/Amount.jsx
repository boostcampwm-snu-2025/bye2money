// 인자로 스타일(폰트, 너비)도 받을 수 있는 방법 찾기
const Amount = ({ value, readOnly = true, onChange }) => {
    const formattedValue = Number(value).toLocaleString();

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, "");
        if (onChange) {
            onChange(rawValue);
        }
    };

    return readOnly ? (
        // "읽기 전용"
        <span className="text-xl text-gray-600">{formattedValue}</span>
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
