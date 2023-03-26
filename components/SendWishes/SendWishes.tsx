"use client";

import { WishesRequest } from "@/app/api/wishes/sendWishes";
import { SheetColumn } from "@/app/api/wishes/types";
import submitButtonImage from "@/public/images/send-wishes.png";
import headerImage from "@/public/images/wishes-baby-luna.png";
import cn from "classnames";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./SendWishes.module.css";
import { useSendWishes } from "./hooks/useSendWishes";
import {
  PROMPTS,
  labelFromPrompt,
  placeholderFromPrompt,
  requiredFromPrompt,
} from "./utils/prompts";
import { EMPTY_WISHES_REQUEST } from "./utils/wishes";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export function SendWishes() {
  const [wishes, setWishes] = useState<WishesRequest>(EMPTY_WISHES_REQUEST);

  const invalid = !wishes[SheetColumn.Name].trim();
  const [formState, setFormState] = useState<"error" | "sent">();
  const { sendWishes, isSending } = useSendWishes();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if ("sent" === formState) {
      setWishes(EMPTY_WISHES_REQUEST);
      setFormState(undefined);

      return;
    }

    if (invalid) {
      return;
    }

    setFormState(undefined);

    try {
      await sendWishes(wishes);

      setFormState("sent");
    } catch (err) {
      console.error(err);
      setFormState("error");
    }
  };

  return (
    <form
      className={cn(styles.root, playfairDisplay.className)}
      onSubmit={handleSubmit}
    >
      <header className={styles.header}>
        <Image
          src={headerImage}
          alt="Wishes for Baby Luna"
          className={styles.headerImage}
          width={832}
          height={453}
          priority
        />
      </header>
      <main
        className={cn(styles.main, {
          [styles.mainSent]: "sent" === formState,
        })}
      >
        {PROMPTS.map((prompt) => (
          <div key={prompt} className={styles.formControl}>
            <label htmlFor={prompt} className={styles.formLabel}>
              {labelFromPrompt(prompt)}
            </label>
            <input
              className={styles.formInput}
              type="text"
              id={prompt}
              name={prompt}
              required={requiredFromPrompt(prompt)}
              size={1}
              placeholder={placeholderFromPrompt(prompt)}
              value={wishes[prompt]}
              onChange={({ target }) => {
                setWishes({ ...wishes, [prompt]: target.value });
              }}
            />
          </div>
        ))}
      </main>
      <footer className={styles.footer}>
        <button
          type="submit"
          className={cn(styles.submitButton, {
            [styles.submitButtonLoading]: isSending,
          })}
          disabled={invalid || isSending}
        >
          <Image
            src={submitButtonImage}
            alt="Send Wishes"
            width={491}
            height={112}
            className={styles.submitButtonImage}
          />
        </button>
        {"error" === formState && (
          <p className={styles.error}>Error sending wishes</p>
        )}
      </footer>
    </form>
  );
}
