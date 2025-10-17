import { useCallback, useEffect, useRef } from "react";
import { useRootPositionStore } from "../stores/rootPositionStore";

export const useRootPosition = () => {
  const {
    setPositionLeft,
    setPositionTop,
    setPositionBottom,
    setPositionRight,
  } = useRootPositionStore();

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback(() => {
    const node = nodeRef.current;
    if (node) {
      setPositionLeft(node.getBoundingClientRect().left);
      setPositionTop(node.getBoundingClientRect().top);
      setPositionBottom(node.getBoundingClientRect().bottom);
      setPositionRight(node.getBoundingClientRect().right);
    }
  }, []);

  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        nodeRef.current = node;
        updatePosition();
      } else {
        nodeRef.current = null;
      }
    },
    [updatePosition]
  );

  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  return refCallback;
};
