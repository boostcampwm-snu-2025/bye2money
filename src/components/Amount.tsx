import cn from "classnames";
import React from "react";

interface AmountProps {
    value: string | number;
    readOnly?: boolean;
    colorVariant?: "default" | "neutral";
    className?: string;
    onChange?: (value: string) => void;
}

const Amount: React.FC<AmountProps> = ({
    value,
    readOnly = true,
    colorVariant = "default", // neutral이면 무조건 검정색
    className, // 스타일을 인자로 받을 수 있게 해서 재사용성 증가
    onChange,
}) => {
    const numericValue = Number(value) || 0;
    const isIncome = numericValue > 0;
    const isZero = numericValue === 0;

    const formattedValue = `${readOnly ? (isIncome ? "+" : "-") : ""}${Math.abs(
        numericValue
    ).toLocaleString()}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, "");
        if (onChange) {
            onChange(rawValue);
        }
    };

    return readOnly ? (
        // "읽기 전용"
        <span
            className={cn(
                "text-xl",
                {
                    // 'default' variant: 수입(빨강), 지출(파랑)
                    "text-red-500":
                        colorVariant === "default" && isIncome && !isZero,
                    "text-blue-500":
                        colorVariant === "default" && !isIncome && !isZero,

                    // 'neutral' variant: 0이 아니면 모두 검정
                    "text-black": colorVariant === "neutral" && !isZero,

                    // 0은 항상 회색
                    "text-gray-800": isZero,
                },
                className // 부모한테 받은 스타일
            )}
        >
            {formattedValue}
        </span>
    ) : (
        // "편집 가능"
        <input
            type="text"
            value={formattedValue}
            onChange={handleChange}
            placeholder="0"
            className={cn(
                "text-xl text-right font-semibold text-black w-[120px]",
                className
            )}
        />
    );
};

export default Amount;
