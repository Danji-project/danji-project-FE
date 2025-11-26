import { create } from "zustand";

interface RootPositionBase {
  positionTop: number;
  positionLeft: number;
  positionBottom: number;
  positionRight: number;

  setPositionTop: (positionTop: number) => void;
  setPositionLeft: (positionLeft: number) => void;
  setPositionBottom: (positionBottom: number) => void;
  setPositionRight: (positionRight: number) => void;
}

export const useRootPositionStore = create<RootPositionBase>((set) => ({
  positionTop: 0,
  positionLeft: 0,
  positionBottom: 0,
  positionRight: 0,

  setPositionTop: (positionTop) => set({ positionTop }),
  setPositionLeft: (positionLeft) => set({ positionLeft }),
  setPositionBottom: (positionBottom) => set({ positionBottom }),
  setPositionRight: (positionRight) => set({ positionRight }),
}));
