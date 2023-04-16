"use client";

import { PROMPTS, labelFromPrompt } from "@/lib/wishes/prompts";
import { WishResponse } from "@/lib/wishes/types";
import { useCallback, useEffect, useState } from "react";
import { Navigation } from "./Navigation";
import { Pagination } from "./Pagination";
import styles from "./Wishes.module.css";
import { shuffle } from "./utils/shuffle";

interface Props {
  wishes: WishResponse[];
}

export const Wishes = (props: Props) => {
  const [wishes, setWishes] = useState<WishResponse[]>([]);
  useEffect(() => {
    setWishes(shuffle(props.wishes));
  }, [props.wishes]);

  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    const index = wishes.findIndex(
      (wish) => hashFromWish(wish) === window.location.hash
    );

    setActiveIndex(-1 === index ? 0 : index);
  }, [wishes]);

  const activeWish = wishes[activeIndex] as WishResponse | undefined;
  useEffect(() => {
    if (activeWish) {
      history.replaceState(null, "", hashFromWish(activeWish));
    }
  }, [activeWish]);

  const next = useCallback(() => {
    setActiveIndex((prevValue) => {
      if (wishes.length - 1 === prevValue) {
        return 0;
      }

      return prevValue + 1;
    });
  }, [wishes.length]);

  const previous = useCallback(() => {
    setActiveIndex((prevValue) => {
      if (0 === prevValue) {
        return wishes.length - 1;
      }

      return prevValue - 1;
    });
  }, [wishes.length]);

  return (
    <>
      <Pagination
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        totalCount={wishes.length}
      />
      <div className={styles.content}>
        <ul className={styles.list}>
          {PROMPTS.map((prompt) => {
            const wish = activeWish?.wishes.find(
              (wish) => prompt === wish.prompt
            );

            return !wish ? null : (
              <li key={prompt}>
                <div className={styles.prompt}>{labelFromPrompt(prompt)}</div>
                <div className={styles.response}>{wish.response}</div>
              </li>
            );
          })}
        </ul>
        <Navigation onPrevious={previous} onNext={next} />
      </div>
    </>
  );
};

function hashFromWish({ id }: WishResponse): string {
  return `#${id}`;
}
