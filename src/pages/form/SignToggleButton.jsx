const SignToggleButton = ({ isPlus, onChange }) => {
    const handleToggle = () => {
        onChange(!isPlus);
    };

    return (
        <div className="pl-2">
            <div className="text-xl text-black mb-1 pr-8">금액</div>
            <div
                onClick={handleToggle}
                className="text-2xl font-semibold cursor-pointer"
            >
                {isPlus ? "+" : "-"}
            </div>
        </div>
    );
};

export default SignToggleButton;
