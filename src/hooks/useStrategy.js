import { useCallback } from 'react';

export const validateInputs = (
  titleRef,
  periodRef,
  targetRef,
  budgetRef,
  isFailed,
  setIsFailed
) => {
  const titleValue = titleRef.current.value;
  const periodValue = periodRef.current.value;
  const targetValue = targetRef.current.value;
  const budgetValue = budgetRef.current.value;

  const updatedIsFailed = {
    title: titleValue === '',
    period: !/^\d+$/.test(periodValue),
    target: !/^\d+$/.test(targetValue),
    budget: !/^\d+$/.test(budgetValue),
  };

  setIsFailed(updatedIsFailed);

  const hasAnyFalse = Object.values(updatedIsFailed).some((value) => value);
  if (hasAnyFalse) {
    alert('모든 필드를 올바르게 입력해주세요.');
  }
};

export const validateFull = (
  value,
  titleRef,
  periodRef,
  targetRef,
  budgetRef,
  setIsInputFull
) => {
  const fullValue = () => {
    return !value.some((item) => item.trim() === ''); // 공백만 있는 경우 방지
  };
  const isTitleFilled = titleRef.current?.value?.trim() !== '';
  const isPeriodFilled = periodRef.current?.value?.trim() !== '';
  const isTargetFilled = targetRef.current?.value?.trim() !== '';
  const isBudgetFilled = budgetRef.current?.value?.trim() !== '';

  if (
    isTitleFilled &&
    isPeriodFilled &&
    isTargetFilled &&
    isBudgetFilled &&
    fullValue()
  ) {
    setIsInputFull(true);
  } else {
    setIsInputFull(false); // 조건 미충족 시 false로 초기화
  }
};

export const useValidateFull = (
  value,
  titleRef,
  periodRef,
  targetRef,
  budgetRef,
  setIsInputFull
) => {
  const validateFull = useCallback(() => {
    const isTitleFilled = titleRef.current?.value?.trim() !== '';
    const isPeriodFilled = periodRef.current?.value?.trim() !== '';
    const isTargetFilled = targetRef.current?.value?.trim() !== '';
    const isBudgetFilled = budgetRef.current?.value?.trim() !== '';
    const fullValue = () => !value.some((item) => item.trim() === '');

    if (
      isTitleFilled &&
      isPeriodFilled &&
      isTargetFilled &&
      isBudgetFilled &&
      fullValue()
    ) {
      setIsInputFull(true);
    } else {
      setIsInputFull(false);
    }
  }, [value, titleRef, periodRef, targetRef, budgetRef, setIsInputFull]);

  // `validateFull` 함수 반환
  return validateFull;
};
