import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { SheetColumn } from "./types";

export type WishesRequest = Record<
  Exclude<SheetColumn, SheetColumn.Submitted | SheetColumn.Reviewed>,
  string
>;

export interface WishesResponse {
  submitted: string;
}

export async function sendWishes(
  sheet: GoogleSpreadsheetWorksheet,
  wishes: WishesRequest
): Promise<WishesResponse> {
  const submitted = new Date().toISOString();

  await sheet.addRow({
    ...wishes,
    [SheetColumn.Submitted]: submitted,
  });

  return { submitted };
}
