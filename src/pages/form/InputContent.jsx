const InputContent = ({ value, onChange }) => {
    const length = value.length;

    const handleChange = (e) => {
        if (e.target.value.length <= 32) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-baseline mb-1">
                <label
                    htmlFor="contentInput"
                    className="block text-xl text-black"
                >
                    내용
                </label>
                <span className="text-xl text-black">{length}/32</span>
            </div>
            <input
                id="contentInput"
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="입력하세요"
                className="text-xl font-semibold text-black"
            />
        </div>
    );
};

export default InputContent;
