import { loadSheet } from "@/lib/googleSheet/loadSheet";
import { PROMPTS, Prompt } from "@/lib/wishes/prompts";
import { Wish, WishResponse } from "@/lib/wishes/types";
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { SheetColumn } from "../api/wishes/types";

export async function fetchWishes(
  documentId = String(process.env.GOOGLE_SHEETS_DOCUMENT_ID),
  sheetId = String(process.env.GOOGLE_SHEETS_WISHES_SHEET_ID)
): Promise<WishResponse[]> {
  const sheet = await loadSheet(documentId, sheetId);
  const rows = await sheet.getRows();

  return rows.reduce<WishResponse[]>((result, row, index) => {
    if ("1" === row[SheetColumn.Reviewed]) {
      result.push(wishFromRow(row, index));
    }

    return result;
  }, []);
}

function wishFromRow(row: GoogleSpreadsheetRow, id: number): WishResponse {
  const wishes: Wish[] = [];

  for (const prompt of Object.keys(row)) {
    const response = row[prompt];

    if (response && PROMPTS.includes(prompt as Prompt)) {
      wishes.push({ prompt, response });
    }
  }

  return { id, wishes };
}
