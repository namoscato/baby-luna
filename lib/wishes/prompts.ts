import { SheetColumn } from "@/app/api/wishes/types";

export const PROMPTS = [
  SheetColumn.HopeLove,
  SheetColumn.HopeLearn,
  SheetColumn.HopeLaugh,
  SheetColumn.HopeBecome,
  SheetColumn.HopeDoNot,
  SheetColumn.HopeKnow,
  SheetColumn.HopeGet,
  SheetColumn.HopeGo,
  SheetColumn.HopeGetYourMoms,
  SheetColumn.HopeGetYourDads,
  SheetColumn.Name,
] as const;

export type Prompt = (typeof PROMPTS)[number];

export function labelFromPrompt(prompt: Prompt): string {
  if (SheetColumn.Name === prompt) {
    return "Love,";
  }

  return `I hope you ${prompt}`;
}
