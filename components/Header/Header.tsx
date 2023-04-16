import image from "@/public/images/wishes-baby-luna.png";
import Image from "next/image";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.root}>
      <Image
        src={image}
        alt="Wishes for Baby Luna"
        className={styles.image}
        width={832}
        height={453}
        priority
      />
    </header>
  );
};
