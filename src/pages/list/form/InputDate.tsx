import React from "react";

// Props 타입 정의
interface InputDateProps {
    value: string;
    onChange: (value: string) => void;
}

const InputDate: React.FC<InputDateProps> = ({ value, onChange }) => {
    return (
        <div>
            <label
                htmlFor="currentDate"
                className="block text-xl text-black mb-1"
            >
                일자
            </label>
            <input
                type="date"
                id="currentDate"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.value)
                }
                className="appearance-none bg-transparent border-none w-full text-black focus:outline-none focus:ring-0 text-xl font-semibold p-0 m-0 cursor-pointer"
            />
        </div>
    );
};

export default InputDate;
