import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

// Registra adherencia de un plan concreto
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // esperamos:
    // {
    //   planId: string;
    //   taken: boolean;
    // }

    if (
      !body ||
      typeof body.planId !== "string" ||
      typeof body.taken !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      );
    }

    const entry = db.logAdherence({
      planId: body.planId,
      taken: body.taken
    });

    const summary = db.getAdherenceSummaryLast7Days();

    return NextResponse.json(
      {
        ok: true,
        entry,
        summary
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/adherence error", err);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
