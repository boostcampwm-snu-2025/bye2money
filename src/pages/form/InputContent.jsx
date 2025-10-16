const InputContent = ({ value, onChange }) => {
    const length = value.length;

    const handleChange = (e) => {
        if (e.target.value.length <= 32) {
            onChange(e.target.value);
        }
    };

    return (
        <div>
            <div className="flex justify-between">
                <span className="text-xl text-gray-600">내용</span>
                <span className="text-xl text-gray-600">{length}/32</span>
            </div>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="입력하세요"
                className="text-xl text-gray-600"
            />
        </div>
    );
};

export default InputContent;
