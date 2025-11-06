import React from "react";
import { CategoryStat } from "./StatsPage";

interface DonutChartProps {
    stats: CategoryStat[];
}

// SVG 경로(path)를 계산하기 위한 헬퍼 함수
const getArcPath = (
    center: number,
    outerRadius: number,
    innerRadius: number,
    startAngle: number,
    endAngle: number
): string => {
    // 각도를 라디안으로 변환 (SVG는 Y축이 반대이므로 -90도(위쪽)에서 시작)
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    // 각 지점의 (x, y) 좌표 계산
    const [startX, startY] = [
        center + Math.cos(startRad) * outerRadius,
        center + Math.sin(startRad) * outerRadius,
    ];
    const [endX, endY] = [
        center + Math.cos(endRad) * outerRadius,
        center + Math.sin(endRad) * outerRadius,
    ];
    const [innerStartX, innerStartY] = [
        center + Math.cos(startRad) * innerRadius,
        center + Math.sin(startRad) * innerRadius,
    ];
    const [innerEndX, innerEndY] = [
        center + Math.cos(endRad) * innerRadius,
        center + Math.sin(endRad) * innerRadius,
    ];

    // 180도가 넘는 호(slice)인지 여부
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    // SVG path 'd' 속성 문자열
    return [
        `M ${startX},${startY}`, // 1. 바깥쪽 호의 시작점으로 이동
        `A ${outerRadius},${outerRadius} 0 ${largeArcFlag} 1 ${endX},${endY}`, // 2. 바깥쪽 호 그리기
        `L ${innerEndX},${innerEndY}`, // 3. 안쪽 호의 끝점으로 선 긋기
        `A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX},${innerStartY}`, // 4. 안쪽 호 그리기 (반대 방향)
        "Z", // 5. 경로 닫기
    ].join(" ");
};

const DonutChart: React.FC<DonutChartProps> = ({ stats }) => {
    const size = 500; // SVG 캔버스 크기
    const center = size / 2;
    const outerRadius = 160;
    const innerRadius = 100;

    let currentAngle = 0; // 0도에서 360도까지

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {stats.length > 0 ? (
                stats.map((stat: CategoryStat) => {
                    const sliceAngle = (stat.percentage / 100) * 360;
                    const startAngle = currentAngle;
                    let endAngle = currentAngle + sliceAngle;

                    // 100% (360도)짜리 조각은 359.99도짜리 조각으로 그립니다.
                    if (sliceAngle === 360) {
                        endAngle = 359.99;
                    }

                    const pathData = getArcPath(
                        center,
                        outerRadius,
                        innerRadius,
                        startAngle,
                        endAngle
                    );

                    currentAngle = endAngle; // 다음 조각을 위해 각도 누적

                    return (
                        <path key={stat.name} d={pathData} fill={stat.color} />
                    );
                })
            ) : (
                // 데이터가 없을 때 표시할 회색 링
                <circle
                    cx={center}
                    cy={center}
                    r={(outerRadius + innerRadius) / 2}
                    fill="transparent"
                    stroke="#e5e7eb" // Tailwind gray-200
                    strokeWidth={outerRadius - innerRadius}
                />
            )}
        </svg>
    );
};

export default DonutChart;
