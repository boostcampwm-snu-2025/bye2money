function CalendarView() {
  return (
    <>
      <table className="w-[846px]">
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>{/* Calendar rows would go here */}</tbody>
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

export default CalendarView;
