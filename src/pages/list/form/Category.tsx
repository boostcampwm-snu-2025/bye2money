import React, { useState, useRef, useEffect } from "react";
import ChevronDownIcon from "../../../components/ChevronDownIcon";

// 카테고리/결제수단 옵션 공통 타입
interface OptionType {
    id: number | string; // id가 숫자 또는 문자일 수 있음
    name: string;
}

// Props 타입 정의
interface CategoryProps {
    options: OptionType[];
    selectedOption: OptionType | null;
    onSelect: (option: OptionType) => void;
}

const Category: React.FC<CategoryProps> = ({
    options,
    selectedOption,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: OptionType) => {
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
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
                    {options.map((option: OptionType) => (
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
