import { useCallback } from "react";
import { useRootPositionStore } from "../stores/rootPositionStore";

export const useRootPosition = () => {
  const {
    setPositionLeft,
    setPositionTop,
    setPositionBottom,
    setPositionRight,
  } = useRootPositionStore();

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setPositionLeft(node.getBoundingClientRect().left);
      setPositionTop(node.getBoundingClientRect().top);
      setPositionBottom(node.getBoundingClientRect().bottom);
      setPositionRight(node.getBoundingClientRect().right);
    }
  }, []);

  return refCallback;
};
