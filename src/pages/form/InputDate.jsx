import { useState, useEffect } from "react";

const InputDate = () => {
    const today = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState(today);

    return (
        <>
            <p className="text-xl text-gray-600">일자</p>
            <input
                type="date"
                id="currentDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent border-none text-xl text-black focus:outline-none"
            />
        </>
    );
};

export default InputDate;
