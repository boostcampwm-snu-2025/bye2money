// 통화 표기(목록/미리보기 등에 사용)
export const formatCurrency = (n: number) =>
    n.toLocaleString('ko-KR', { maximumFractionDigits: 0 }) + '원';
  
  export const isIncome = (a: number) => a > 0;
  
  // --- 입력란용 숫자 문자열 ↔ 포맷 도우미 ---
  
  // 숫자만 추출
  export const onlyDigits = (s: string) => (s.match(/\d+/g)?.join('') ?? '');
  
  // 1234567 -> "1,234,567"
  export const withCommas = (digits: string) =>
    digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  /**
   * 입력창의 커서 위치를 보존하며 쉼표 포맷을 적용
   * @param raw 기존 onChange 이벤트의 value (쉼표/문자 포함 가능)
   * @param caret 기존 selectionStart
   */
  export function formatNumberInput(raw: string, caret: number) {
    const digitsLeftOfCaret = onlyDigits(raw.slice(0, caret)).length;
    const allDigits = onlyDigits(raw);
    const formatted = withCommas(allDigits);
  
    // 새 문자열에서 digitsLeftOfCaret번째 숫자의 인덱스 계산
    let seen = 0;
    let newCaret = formatted.length;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        seen++;
        if (seen === digitsLeftOfCaret) {
          newCaret = i + 1; // 해당 숫자 뒤
          break;
        }
      }
    }
    return { formatted, newCaret, numeric: Number(allDigits || '0') };
  }
  