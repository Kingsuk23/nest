import { useCallback, useEffect, useRef, useState } from "react";

export const useSlider = (activeIndex: number) => {
  const tabRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [indicator, setIndicator] = useState({
    width: 0,
    left: 0,
  });

  const updateIndicator = useCallback(() => {
    const button = buttonRefs.current[activeIndex];
    if (!button) return;

    const next = { width: button.offsetWidth, left: button.offsetLeft };

    setIndicator((prev) =>
      prev.width === next.width && prev.left === next.left ? prev : next,
    );
  }, [activeIndex]);

  useEffect(() => {
    updateIndicator();

    const container = tabRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(updateIndicator);

    resizeObserver.observe(container);

    buttonRefs.current.forEach((button) => {
      if (button) resizeObserver.observe(button);
    });

    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return { tabRef, buttonRefs, indicator };
};
