const CircleButton = ({
    size = "m",
    isActive,
    activeColor,
    inactiveColor,
    imageUrl,
    onClick,
}) => {
    const backgroundColor = isActive ? activeColor : inactiveColor;

    const sizeStyles = {
        m: {
            button: "w-12 h-12",
            image: "w-6 h-6",
        },
        s: {
            button: "w-6 h-6",
            image: "w-3 h-3",
        },
    };

    return (
        <button
            type="button"
            onClick={onClick}
            style={{ backgroundColor: backgroundColor }}
            className={`${
                sizeStyles[size].button
            } rounded-full flex justify-center items-center transition-colors ${
                isActive ? "cursor-pointer" : ""
            }`}
        >
            <img
                src={imageUrl}
                alt="icon"
                className={`${sizeStyles[size].image} object-cover`}
            />
        </button>
    );
};

export default CircleButton;
