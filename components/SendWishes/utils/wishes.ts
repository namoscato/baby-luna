import { WishesRequest } from "@/app/api/wishes/sendWishes";
import { PROMPTS, Prompt } from "@/lib/wishes/prompts";

export const EMPTY_WISHES_REQUEST: WishesRequest = {
  ...PROMPTS.reduce((result, prompt) => {
    result[prompt] = "";
    return result;
  }, {} as Record<Prompt, string>),
};
