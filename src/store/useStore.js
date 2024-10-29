import { create } from 'zustand';

export const useStore = create((set) => ({
  selectedDropdown: 0,
  setSelectedDropdown: (selectedDropdown) =>
    set(() => ({
      selectedDropdown,
    })),
}));
