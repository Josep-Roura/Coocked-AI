import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

// Crea un plan post-entreno
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // esperamos que venga esto del frontend
    // {
    //   title: string;
    //   category: string;
    //   description: string;
    // }

    if (
      !body ||
      typeof body.title !== "string" ||
      typeof body.category !== "string"
    ) {
      return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      );
    }

    const plan = db.createPlan({
      title: body.title,
      category: body.category,
      description: body.description ?? ""
    });

    return NextResponse.json(
      {
        ok: true,
        plan
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/plan error", err);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
