const InputDate = ({ value, onChange }) => {
    return (
        <div className="w-[100px]">
            <div className="text-xl text-gray-600">일자</div>
            <input
                type="date"
                id="currentDate"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-transparent border-none text-xl text-black focus:outline-none"
            />
        </div>
    );
};

export default InputDate;
