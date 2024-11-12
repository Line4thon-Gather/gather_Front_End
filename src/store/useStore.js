import { create } from 'zustand';

export const useStore = create((set) => ({
  selectedDropdown: 0,
  setSelectedDropdown: (selectedDropdown) =>
    set(() => ({
      selectedDropdown,
    })),
  value: ['', '', ''],
  setValue: (value, index) =>
    set((state) => {
      const newValue = [...state.value];
      if (value === '선택') newValue[index] = '';
      else if (value === '인쇄물(포스터, 배너 등)') newValue[index] = 'PRINTS';
      else if (value === '영상(숏폼, 롱폼 등)') newValue[index] = 'VIDEO';
      else if (value === 'SNS 게시물(피드 등)') newValue[index] = 'SNS_POST';
      else newValue[index] = '';
      return { value: newValue };
    }),
}));
