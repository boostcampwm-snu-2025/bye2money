import { useState } from "react";
import InputDate from "./InputDate";
import SignToggleButton from "./SignToggleButton";
import Amount from "@/components/Amount";

const SectionForm = () => {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [isPlus, setIsPlus] = useState(true);
    const [amount, setAmount] = useState("");

    return (
        <form className="flex gap-12 items-center space-x-4 w-[896px] h-32 p-4 border border-black mx-auto">
            <InputDate value={date} onChange={setDate} />
            <SignToggleButton isPlus={isPlus} onChange={setIsPlus} />

            <div className="flex items-center">
                <Amount value={amount} onChange={setAmount} readOnly={false} />
                <span className="text-xl text-gray-600"> 원</span>
            </div>
        </form>
    );
};

export default SectionForm;
