import { useEffect, useRef, type MouseEvent } from "react";
import { useApp } from "../../context/AppContext";
import { useScrollTo } from "./useScrollTo";

export function useScrollNavigation() {
  const { setIsClick, setActiveSection } = useApp();
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = useScrollTo();

  const navigateToSection = (
    e: MouseEvent<HTMLElement>,
    target: string,
    onBeforeScroll?: () => void,
  ) => {
    e.preventDefault();

    if (onBeforeScroll) {
      onBeforeScroll();
    }

    setIsClick(false);
    setActiveSection(target.replace("#", ""));
    scrollTo(target);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsClick(true);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return { navigateToSection };
}
