import dayjs from "dayjs";

const temp = dayjs("2023-08-13").startOf("month");
const day = temp.day();
const date = temp.daysInMonth();

const start = -day;
const end = date + (7 - ((date + day) % 7));

function CalendarView() {
  return (
    <>
      <table className="w-[846px] bg-[#FFFFFF]">
        <thead className="h-[48px]">
          <tr>
            <th className="border-[0.5px]">일</th>
            <th className="border-[0.5px]">월</th>
            <th className="border-[0.5px]">화</th>
            <th className="border-[0.5px]">수</th>
            <th className="border-[0.5px]">목</th>
            <th className="border-[0.5px]">금</th>
            <th className="border-[0.5px]">토</th>
          </tr>
        </thead>
        <tbody>
          {fold(range(start, end), 7).map((dates) => (
            <tr key={dates.join(".")}>
              {dates.map((i) => (
                <td className="border-[0.5px] h-[120px]" key={i}>
                  {i < 0 || i >= date ? null : (
                    <div className="h-full p-[8px] flex flex-col justify-between">
                      <div>
                        <div className="text-[16px] leading-[24px] tracking-normal font-semibold font-[Pretendard]"></div>
                        <div className="text-[16px] leading-[24px] tracking-normal font-semibold font-[Pretendard]"></div>
                        <div className="text-[16px] leading-[24px] tracking-normal font-semibold font-[Pretendard]"></div>
                      </div>
                      <div className="text-[14px] leading-[16px] tracking-normal font-semibold font-[Pretendard] text-right">
                        {i + 1}
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-[846px] flex justify-between">
        <div className="flex gap-[8px]">
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            총 수입
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            {/* TODO */}
            {Number(1000).toLocaleString()}원
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            총 지출
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            {/* TODO */}
            {Number(1000).toLocaleString()}원
          </span>
        </div>
        <div className="flex gap-[8px]">
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            총합
          </span>
          <span className="text-[14px] leading-[16px] tracking-normal font-normal font-[ChosunNM]">
            {/* TODO */}
            {Number(1000).toLocaleString()}원
          </span>
        </div>
      </div>
    </>
  );
}

function fold<T>(array: T[], count: number) {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += count) {
    result.push(array.slice(i, i + count));
  }
  return result;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

export default CalendarView;
