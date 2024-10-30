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
      newValue[index] = value === '선택' ? '' : value;
      return { value: newValue };
    }),
}));
