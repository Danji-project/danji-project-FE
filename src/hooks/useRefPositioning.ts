import { useEffect } from "react";
import { usePositionStore } from "../stores/usePositionStore";

export const useRefPositioning = (
  htmlRef: React.RefObject<HTMLDivElement | null>
) => {
  const { setXStart, setXEnd, setYStart, setYEnd } = usePositionStore();

  useEffect(() => {
    const updatePosition = () => {
      if (!htmlRef.current) return;

      const rect = htmlRef.current.getBoundingClientRect();
      setXStart(rect.left);
      setXEnd(rect.right);
      setYStart(rect.top);
      setYEnd(rect.bottom);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [htmlRef]);
};
