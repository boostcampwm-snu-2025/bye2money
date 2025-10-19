import { useEffect, useRef, useState } from "react";
import CheckIcon from "../assets/icons/add-btn.svg?react";
import { Button } from "./Button";
import { DateTime } from "luxon";
import PlusIcon from "../assets/icons/plus.svg?react";
import MinusIcon from "../assets/icons/minus.svg?react";
import { TextInput } from "./TextInput";
import { getLabel, type Category } from "./CategoryTag";
import { CategorySelectChip } from "./CategorySelectChip";
import { Dropdown } from "./Dropdown";
import { Modal } from "./Modal";
import { useSpendingDetailStore } from "../store/useSpendingDetailStore";
import { PaymentMethodSelectChip } from "./PaymentMethodSelectChip";
import { useSpendingEditStore } from "../store/useSpendingEditStore";
import { useDropdownStore } from "../store/useDropdownStore";
import { useModalStore } from "../store/useModalStore";

const expenditureTypes: Category[] = [
  "food",
  "living",
  "transport",
  "medicalHealth",
  "shoppingBeauty",
  "cultureLeisure",
  "unclassified",
];
export const incomeTypes: Category[] = ["salary", "allowance", "otherIncome"];

export const HeaderAppendBar = () => {
  const {
    date,
    setDate,
    isExpenditure,
    toggleIsExpenditure,
    amount,
    amountStr,
    handleAmountChange,
    description,
    setDescription,
    category,
    setCategory,
    paymentMethod,
    setPaymentMethod,
    newPaymentMethod,
    setNewPaymentMethod,
    isComplete,
    clearValues,
    id,
  } = useSpendingEditStore();
  const {
    paymentMethods,
    addPaymentMethod,
    addSpending,
    updateSpending,
    removePaymentMethod,
  } = useSpendingDetailStore();
  const {
    categoryDropdownOpened,
    methodDropdownOpened,
    toggleCategoryDropdown,
    toggleMethodDropdown,
    closeMethodDropdown,
    closeCategoryDropdown,
  } = useDropdownStore();
  const {
    methodAppendModalOpened,
    methodRemoveModalOpened,
    openMethodAppendModal,
    closeMethodAppendModal,
    openMethodRemoveModal,
    closeMethodRemoveModal,
    methodToRemove,
  } = useModalStore();

  const dateRef = useRef(null);

  const incomeTypeChips = incomeTypes.map((iT) => (
    <CategorySelectChip key={iT} category={iT} />
  ));
  const expenditureTypeChips = expenditureTypes.map((eT) => (
    <CategorySelectChip key={eT} category={eT} />
  ));

  const paymentMethodChips = [
    ...paymentMethods.map((eT) => (
      <PaymentMethodSelectChip key={eT} method={eT} />
    )),
    <button
      onClick={openMethodAppendModal}
      className="flex flex-row items-center h-[56px] w-[152px] px-[24px]"
    >
      추가하기
    </button>,
  ];

  useEffect(() => {
    if (!paymentMethods.includes(paymentMethod)) setPaymentMethod(undefined);
  }, [paymentMethods]);

  const getIsExpenditureButtonIcon = () => {
    return isExpenditure ? (
      <MinusIcon width="16px" height="16px" />
    ) : (
      <PlusIcon width="16px" height="16px" />
    );
  };
  return (
    <>
      <div className="absolute flex flex-row top-[176px] left-[273px] w-[894px] h-[76px] bg-neutral-surface-default border-[0.5px] border-neutral-border-default px-[24px] items-center justify-between">
        <div className="relative flex flex-col justify-between w-[88px] h-[44px]">
          <label className="h-[24px] font-sans text-sans-light-sm">일자</label>
          <button
            onClick={() => dateRef.current.showPicker()}
            className="bottom-0 h-[16px] font-sans font-semibold text-sans-semibold-sm text-start"
          >
            {date.replaceAll("-", ". ")}
          </button>
          <input
            ref={dateRef}
            className="absolute invisible bottom-0 h-[16px] font-sans text-sans-semibold-sm"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="w-[0.5px] bg-neutral-text-default h-[44px]"></div>

        <div className="flex flex-col w-[134px] h-[44px]">
          <label className="h-[24px] font-sans text-sans-light-sm">금액</label>
          <div className="flex flex-row w-[134px] justify-between items-center">
            <button onClick={toggleIsExpenditure}>
              {getIsExpenditureButtonIcon()}
            </button>
            <div className="w-[88px]">
              <TextInput
                value={amountStr}
                isHollow={true}
                placeholder={"금액"}
                onChange={handleAmountChange}
              />
            </div>
            <h6 className="font-light font-sans text-sans-light-sm">원</h6>
          </div>
        </div>
        <div className="w-[0.5px] bg-neutral-text-default h-[44px]"></div>

        <div className="flex flex-col w-[160px] h-[44px] justify-between">
          <div className="flex flex-row w-full justify-between h-[24px] items-center">
            <label className="h-[24px] font-sans text-sans-light-sm">
              내용
            </label>
            <label className="h-[24px] font-sans text-sans-light-sm text-neutral-text-weak">
              {description.length}/32
            </label>
          </div>
          <TextInput
            value={description}
            isHollow={true}
            placeholder={"입력하세요"}
            onChange={(e) => setDescription(e.target.value.slice(0, 32))}
          />
        </div>
        <div className="w-[0.5px] bg-neutral-text-default h-[44px]"></div>

        <div className="relative flex flex-col w-[104px] h-[44px]">
          <label className="h-[24px] font-sans text-sans-light-sm">
            결제수단
          </label>
          <button className="flex flex-row" onClick={toggleMethodDropdown}>
            {paymentMethod ?? "선택하세요"}
          </button>
          {methodDropdownOpened && (
            <Dropdown
              onClose={closeMethodDropdown}
              topOffset={60}
              leftOffset={-23.78}
              setValue={setPaymentMethod}
              elements={paymentMethodChips}
            />
          )}
        </div>
        <div className="w-[0.5px] bg-neutral-text-default h-[44px]"></div>

        <div className="relative flex flex-col w-[104px] h-[44px]">
          <label className="h-[24px] font-sans text-sans-light-sm">분류</label>
          <button className="flex flex-row" onClick={toggleCategoryDropdown}>
            {category ? getLabel(category) : "선택하세요"}
          </button>
          {categoryDropdownOpened && (
            <Dropdown
              onClose={closeCategoryDropdown}
              topOffset={60}
              leftOffset={-23.78}
              setValue={setCategory}
              elements={isExpenditure ? expenditureTypeChips : incomeTypeChips}
            />
          )}
        </div>

        <Button
          icon={CheckIcon}
          onClick={() => {
            const dateTime = DateTime.fromISO(date);
            const { year, month, day } = dateTime;
            const form = {
              year,
              month,
              day,
              isExpenditure,
              amount,
              description,
              paymentMethod,
              category,
            };
            if (id) updateSpending(id, form);
            else addSpending(form);
            clearValues();
          }}
          variant={"lg"}
          disabled={!isComplete}
        />
      </div>
      {methodAppendModalOpened && (
        <Modal
          text={"추가하실 결제 수단을 입력해주세요."}
          disabled={false}
          value={newPaymentMethod}
          setValue={(e) => setNewPaymentMethod(e.target.value)}
          actionTitle="추가"
          actionColor="gray"
          action={() => {
            addPaymentMethod(newPaymentMethod);
            setNewPaymentMethod("");
            closeMethodAppendModal();
          }}
          close={closeMethodAppendModal}
        />
      )}
      {methodRemoveModalOpened && (
        <Modal
          setValue={() => { }}
          actionTitle={"삭제"}
          actionColor={"red"}
          text={"해당 결제수단을 삭제하시겠습니까?"}
          disabled={true}
          value={methodToRemove}
          action={() => {
            removePaymentMethod(methodToRemove);
            closeMethodRemoveModal();
          }}
          close={() => closeMethodRemoveModal()}
        />
      )}
    </>
  );
};
