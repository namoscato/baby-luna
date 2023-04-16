import cn from "classnames";
import styles from "./Navigation.module.css";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

interface Props {
  onPrevious: () => void;
  onNext: () => void;
}

export const Navigation = ({ onPrevious, onNext }: Props) => {
  useKeyboardNavigation({ onPrevious, onNext });

  return (
    <div className={styles.root}>
      <button
        className={cn(styles.button, styles.buttonPrevious)}
        title="View Previous"
        onClick={onPrevious}
      >
        ‹
      </button>
      <button
        className={cn(styles.button, styles.buttonNext)}
        title="View Next"
        onClick={onNext}
      >
        ›
      </button>
    </div>
  );
};
