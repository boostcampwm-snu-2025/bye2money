import { useState, useRef, useEffect } from "react";

const Category = ({ options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="text-xl text-gray-600">분류</div>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? selectedOption.name : "선택하세요"}
            </button>

            {isOpen && (
                <ul className="absolute">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            onClick={() => handleSelect(option)}
                            className="text-xl text-gray-600"
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Category;
