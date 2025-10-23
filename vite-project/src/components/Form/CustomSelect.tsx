import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// --- 스타일 정의 ---

// 래퍼: 'position: relative'가 드롭다운의 기준점이 됩니다.
const SelectWrapper = styled.div`
  position: relative;
  min-width: 120px;
  font-size: 14px;
`;

// 기본 <select>처럼 보이는 박스
const SelectTrigger = styled.div<{ $isOpen: boolean }>`
  border: none;
  padding: 8px 4px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }

  span:first-child {
    color: ${(props) => (props.$isOpen ? "#333" : "#333")};
  }

  span:last-child {
    transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s;
    font-size: 10px;
    color: #999;
  }
`;

// 드롭다운 패널
const DropdownPanel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 180px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  max-height: 280px;
  overflow-y: auto;
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 4px;
  margin: 0;
`;

// 옵션 아이템
const OptionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #bbb;
  font-size: 16px;
  font-weight: normal;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  line-height: 1;

  &:hover {
    color: #f44336;
    background-color: #ffebee;
  }
`;

const AddSection = styled.div`
  display: flex;
  padding: 8px;
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa;
`;

const AddInput = styled.input`
  flex-grow: 1;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 13px;
  margin-right: 6px;
  outline: none;

  &:focus {
    border-color: #333;
  }
`;

const AddButton = styled.button`
  background: #000;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #333;
  }
`;

// --- 컴포넌트 정의 ---

interface Props {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  onAdd: (value: string) => void;
  onDelete: (value: string) => void;
}

export default function CustomSelect({
  options,
  selected,
  onChange,
  onAdd,
  onDelete,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null); // 바깥 영역 클릭 감지를 위한 Ref

  // 바깥 영역 클릭(click-outside) 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // 래퍼 영역 바깥을 클릭하면 닫기
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    onChange(option); // 부모(Form)의 state 변경
    setIsOpen(false); // 드롭다운 닫기
  };

  // 삭제 핸들러
  const handleDelete = (e: React.MouseEvent, option: string) => {
    e.stopPropagation(); // 중요: 클릭 이벤트가 부모(OptionItem)로 전파되는 것을 막음
    if (window.confirm(`'${option}' 결제수단을 삭제하시겠습니까?`)) {
      onDelete(option);
    }
  };
  // 추가 핸들러
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // 중요: 클릭 이벤트가 드롭다운을 닫지 않도록 막음
    const message = "추가하실 결제수단을 입력하세요.";
    const newMethod = window.prompt(message);
    if (!newMethod) return;
    if (newMethod.trim() === "") return;
    if (options.includes(newMethod)) {
      alert("이미 존재하는 결제수단입니다.");
      return;
    }
    onAdd(newMethod.trim());
    return;
  };

  return (
    <SelectWrapper ref={wrapperRef}>
      {/* 클릭하면 드롭다운을 토글하는 박스 */}
      <SelectTrigger $isOpen={isOpen} onClick={handleToggle}>
        <span>{selected || "선택하세요"}</span>
        <span>▼</span>
      </SelectTrigger>

      {/* isOpen이 true일 때만 패널 렌더링 */}
      {isOpen && (
        <DropdownPanel>
          <OptionList>
            {options.map((option) => (
              <OptionItem key={option} onClick={() => handleSelect(option)}>
                <span>{option}</span>
                {/* 6. 삭제 버튼 */}
                <DeleteButton onClick={(e) => handleDelete(e, option)}>
                  X
                </DeleteButton>
              </OptionItem>
            ))}
            <OptionItem onClick={handleAdd}>
              <span>추가하기</span>
            </OptionItem>
          </OptionList>
        </DropdownPanel>
      )}
    </SelectWrapper>
  );
}