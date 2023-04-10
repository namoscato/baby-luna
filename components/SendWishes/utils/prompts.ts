import { SheetColumn } from "@/app/api/wishes/types";
import { Prompt } from "@/lib/wishes/prompts";

export function placeholderFromPrompt(prompt: Prompt): string | undefined {
  if (SheetColumn.Name === prompt) {
    return "your name";
  }
}

export function requiredFromPrompt(prompt: Prompt): boolean {
  return SheetColumn.Name === prompt;
}
