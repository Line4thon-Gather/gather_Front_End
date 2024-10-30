export const validateInputs = (
  periodRef,
  targetRef,
  budgetRef,
  isFailed,
  setIsFailed
) => {
  const periodValue = periodRef.current.value;
  const targetValue = targetRef.current.value;
  const budgetValue = budgetRef.current.value;

  // 잠정적인 상태 객체 생성
  const updatedIsFailed = {
    title: isFailed.title, // title은 여기서 검사하지 않으므로 이전 상태 유지
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
