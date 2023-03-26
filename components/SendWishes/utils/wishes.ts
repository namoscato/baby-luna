import { WishesRequest } from "@/app/api/wishes/sendWishes";
import { Prompt, PROMPTS } from "./prompts";

export const EMPTY_WISHES_REQUEST: WishesRequest = {
  ...PROMPTS.reduce((result, prompt) => {
    result[prompt] = "";
    return result;
  }, {} as Record<Prompt, string>),
};
