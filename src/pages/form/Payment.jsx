import { useState, useRef, useEffect } from "react";

const Payment = ({ options, selectedOption, onSelect, onDelete, onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);
    // 드롭다운 DOM 요소를 가리킬 ref
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    const handleDeleteClick = (event, option) => {
        event.stopPropagation();
        onDelete(option);
    };

    const handleAddClick = (event) => {
        event.stopPropagation();
        onAdd();
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
            <div className="text-xl text-gray-600">결제수단</div>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? selectedOption.name : "선택하세요"}
            </button>

            {isOpen && (
                <ul className="absolute">
                    {options.map((option) => (
                        <li key={option.id}>
                            <span
                                onClick={() => handleSelect(option)}
                                className="text-xl text-gray-600"
                            >
                                {option.name}
                            </span>
                            <button
                                onMouseDown={(e) =>
                                    handleDeleteClick(e, option)
                                }
                                className="text-xs text-gray-600"
                            >
                                X
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onMouseDown={handleAddClick}
                            className="text-xl text-gray-600"
                        >
                            추가하기
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Payment;
