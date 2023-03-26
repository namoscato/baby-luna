import { loadSheet } from "@/lib/googleSheet/loadSheet";
import { NextResponse } from "next/server";
import { WishesResponse, sendWishes } from "./sendWishes";

export async function POST(request: Request): Promise<NextResponse> {
  let data: WishesResponse | null = null;

  try {
    const wishes = await request.json();

    const sheet = await loadSheet(
      String(process.env.GOOGLE_SHEETS_DOCUMENT_ID),
      String(process.env.GOOGLE_SHEETS_WISHES_SHEET_ID)
    );

    data = await sendWishes(sheet, wishes);
  } finally {
    return NextResponse.json({ data });
  }
}
