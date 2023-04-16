import { WishesRequest } from "@/app/api/wishes/sendWishes";
import { PROMPTS, Prompt } from "@/lib/wishes/prompts";

export const EMPTY_WISHES_REQUEST: WishesRequest = {
  ...PROMPTS.reduce((result, prompt) => {
    result[prompt] = "";
    return result;
  }, {} as Record<Prompt, string>),
};

export function isFilled(wishes: WishesRequest): boolean {
  return Object.values(wishes).reduce<boolean>(
    (result, value) => result || value.length > 0,
    false
  );
}
