const SignToggleButton = ({ isPlus, onChange }) => {
    const handleToggle = () => {
        onChange(!isPlus);
    };

    return (
        <div>
            <p className="text-xl text-gray-600">금액</p>
            <p className="text-xl text-gray-600">{isPlus ? "+" : "-"}</p>
            <button type="button" onClick={handleToggle}>
                Click
            </button>
        </div>
    );
};

export default SignToggleButton;
