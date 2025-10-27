import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

// Devuelve la planificación semanal (mock actual + nutrición IA)
export async function GET() {
  try {
    const week = db.getWeek();

    return NextResponse.json(
      {
        ok: true,
        week
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/week error", err);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
