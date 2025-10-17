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
            className="w-12 h-12 rounded-full flex justify-center items-center shadow-md transition-colors"
        >
            <img src={imageUrl} alt="icon" className="w-6 h-6" />
        </button>
    );
};

export default CircleButton;
