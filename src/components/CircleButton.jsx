const CircleButton = ({
    isActive,
    activeColor,
    inactiveColor,
    imageUrl,
    onClick,
}) => {
    const backgroundColor = isActive ? activeColor : inactiveColor;

    return (
        <button
            type="button"
            onClick={onClick}
            style={{ backgroundColor: backgroundColor }}
            className={`w-12 h-12 rounded-full flex justify-center items-center transition-colors ${
                isActive ? "cursor-pointer" : ""
            }`}
        >
            <img src={imageUrl} alt="icon" className="w-6 h-6 object-cover" />
        </button>
    );
};

export default CircleButton;
