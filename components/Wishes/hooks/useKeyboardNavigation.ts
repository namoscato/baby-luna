import { useEffect } from "react";

interface Dependencies {
  onPrevious: () => void;
  onNext: () => void;
}

export function useKeyboardNavigation({
  onPrevious,
  onNext,
}: Dependencies): void {
  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if ("ArrowLeft" === key) {
        onPrevious();
      } else if ("ArrowRight" === key) {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onNext, onPrevious]);
}
