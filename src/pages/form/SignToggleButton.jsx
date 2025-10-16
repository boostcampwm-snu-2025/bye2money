const SignToggleButton = ({ isPlus, onChange }) => {
    const handleToggle = () => {
        onChange(!isPlus);
    };

    return (
        <div>
            <div className="text-xl text-gray-600">금액</div>
            <div className="text-xl text-gray-600">{isPlus ? "+" : "-"}</div>
            <button type="button" onClick={handleToggle}>
                Click
            </button>
        </div>
    );
};

export default SignToggleButton;
