import { useState, useRef, useEffect } from "react";

const ChevronDownIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 text-gray-500"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
    </svg>
);

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
        <div className="relative w-full" ref={dropdownRef}>
            <div className="block text-xl text-black mb-1">분류</div>
            <button
                type="button"
                className="flex justify-between items-center w-full text-lg font-medium p-0 m-0 cursor-pointer focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>
                    {selectedOption ? selectedOption.name : "선택하세요"}
                </span>
                <ChevronDownIcon />
            </button>

            {isOpen && (
                <ul className="absolute mt-10 w-full bg-white border border-t-0 border-black z-10 divide-y divide-black">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            onClick={() => handleSelect(option)}
                            className="text-xl text-black px-3 py-4 cursor-pointer"
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
