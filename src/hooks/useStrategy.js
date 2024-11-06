import { useEffect } from 'react';
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
    budget: !(Number(budgetValue) >= 10000),
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
    const fullValue = () => !value.every((item) => item.trim() === '');

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

  useEffect(() => {
    validateFull();
  }, [validateFull]);

  // `validateFull` 함수 반환
  return validateFull;
};

export const getTagInfo = (data, type) =>
  type === '홍보 타임라인'
    ? [
        {
          src: `calendar.png`,
          content: `총 ${data.period}일`,
        },
        {
          src: 'coin.png',
          content: `${data.budget}원`,
        },
        {
          src: 'target.png',
          content: `${data.target}명`,
        },
      ]
    : [
        {
          src: 'number1.png',
          content: `${data.firstMeans}`,
        },
        {
          src: 'number2.png',
          content: `${data.secondMeans}`,
        },
        {
          src: 'number3.png',
          content: `${data.thirdMeans}`,
        },
      ];

export const getTitle = (type) =>
  type === '홍보 타임라인' ? '정보' : type === '비용관리' ? '우선순위' : '';
