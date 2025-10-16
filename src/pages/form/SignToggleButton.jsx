import { useState } from "react";

const SignToggleButton = () => {
    const [isPlus, setIsPlus] = useState(true);

    const handleToggle = () => {
        setIsPlus((currentSign) => !currentSign);
    };

    return (
        <div>
            <p className="text-xl text-gray-600">금액</p>
            <p className="text-xl text-gray-600">{isPlus ? "+" : "-"}</p>
            <button onClick={handleToggle}>Click</button>
        </div>
    );
};

export default SignToggleButton;
