import { create } from "zustand";

interface RefPosition {
  positionXStart: number | null;
  positionXEnd: number | null;
  positionYStart: number | null;
  positionYEnd: number | null;
}

interface RefPositionFunction extends RefPosition {
  setXStart: (xStart: number) => void;
  setXEnd: (xEnd: number) => void;
  setYStart: (yStart: number) => void;
  setYEnd: (yEnd: number) => void;
}

export const usePositionStore = create<RefPositionFunction>((set) => ({
  positionXStart: null,
  positionXEnd: null,
  positionYStart: null,
  positionYEnd: null,
  setXStart: (xStart: number) => set({ positionXStart: xStart }),
  setXEnd: (xEnd: number) => set({ positionXEnd: xEnd }),
  setYStart: (yStart: number) => set({ positionYStart: yStart }),
  setYEnd: (yEnd: number) => set({ positionYEnd: yEnd }),
}));
