import styles from "./Pagination.module.css";
import cn from "classnames";

interface Props {
  activeIndex: number;
  setActiveIndex: (value: number) => void;
  totalCount: number;
}

export const Pagination = ({
  activeIndex,
  totalCount,
  setActiveIndex,
}: Props) => {
  return (
    <input
      className={cn(styles.root, { [styles.loading]: -1 === activeIndex })}
      type="range"
      min={0}
      max={totalCount - 1}
      value={activeIndex}
      onChange={({ target }) => {
        setActiveIndex(Number(target.value));
      }}
    />
  );
};
