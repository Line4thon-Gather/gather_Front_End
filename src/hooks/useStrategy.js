import { useEffect } from 'react';
import { useCallback } from 'react';

// export const validateInputs = (titleRef, setIsFailed) => {
//   const titleValue = titleRef.current.value;
//   // const periodValue = periodRef.current.value;
//   // const targetValue = targetRef.current.value;
//   // const budgetValue = budgetRef.current.value;

//   const updatedIsFailed = {
//     title: titleValue === '',
//     // period: !/^\d+$/.test(periodValue),
//     // target: !/^\d+$/.test(targetValue),
//     // budget: !(Number(budgetValue) >= 10000),
//   };

//   setIsFailed(updatedIsFailed);

//   const hasAnyFalse = Object.values(updatedIsFailed).some((value) => value);
//   if (hasAnyFalse) {
//     alert('모든 필드를 올바르게 입력해주세요.');
//   }
// };

export const useValidateFull = (
  value,
  titleRef,
  periodRef,
  targetRef,
  budgetRef,
  setIsInputFull
) => {
  const validateFull = useCallback(() => {
    const period = periodRef.current.value.replace(/[^0-9]/g, '');
    const formatted1 = period.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    periodRef.current.value = formatted1;
    const target = targetRef.current.value.replace(/[^0-9]/g, '');
    const formatted2 = target.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    targetRef.current.value = formatted2;
    const budget = budgetRef.current.value.replace(/[^0-9]/g, '');
    const formatted3 = budget.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    budgetRef.current.value = formatted3;

    const isTitleFilled = titleRef.current?.value?.trim() !== '';
    const isPeriodFilled = periodRef.current?.value?.trim() !== '';
    const isTargetFilled = targetRef.current?.value?.trim() !== '';
    const isBudgetFilled =
      budgetRef.current?.value?.trim() !== '' &&
      parseInt(budgetRef.current.value.split(',').join('')) >= 10000;
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
          content: data[0]?.means ?? '없음',
        },
        {
          src: 'number2.png',
          content: data[1]?.means ?? '없음',
        },
        {
          src: 'number3.png',
          content: data[2]?.means ?? '없음',
        },
      ];

export const getTitle = (type) =>
  type === '홍보 타임라인' ? '정보' : type === '비용관리' ? '우선순위' : '';
