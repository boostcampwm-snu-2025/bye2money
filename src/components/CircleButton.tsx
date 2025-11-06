import cn from "classnames";
import React from "react";

interface CircleButtonProps {
    size?: "m" | "s";
    isActive: boolean;
    activeClass: string;
    inactiveClass: string;
    imageUrl: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const CircleButton: React.FC<CircleButtonProps> = ({
    size = "m",
    isActive,
    activeClass,
    inactiveClass,
    imageUrl,
    onClick,
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(
                "rounded-full flex justify-center items-center transition-colors",
                {
                    "cursor-pointer": isActive,
                    [activeClass]: isActive,
                    [inactiveClass]: !isActive,

                    "w-12 h-12": size === "m",
                    "w-6 h-6": size === "s",
                }
            )}
        >
            <img
                src={imageUrl}
                alt="icon"
                className={cn("object-cover", {
                    "w-6 h-6": size === "m",
                    "w-3 h-3": size === "s",
                })}
            />
        </button>
    );
};

export default CircleButton;
