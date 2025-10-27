import { NextResponse } from "next/server";
import { supabase } from "@/lib/server/supabase";
import { getDemoUserId } from "@/lib/auth/getDemoUserId";

function getUserIdFromRequest(): string {
  // TODO: en el futuro leer JWT/headers/etc
  return getDemoUserId();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, taken } = body ?? {};

    if (typeof planId !== "string" || typeof taken !== "boolean") {
      return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      );
    }

    const userId = getUserIdFromRequest();

    const { error: insertError } = await supabase
      .from("adherence_logs")
      .insert({
        user_id: userId,
        plan_id: planId,
        taken
      });

    if (insertError) {
      console.error("POST /api/adherence error", insertError);
      return NextResponse.json(
        { error: "No se pudo guardar la adherencia" },
        { status: 500 }
      );
    }

    const summary = await fetchSummary(userId);

    return NextResponse.json(
      {
        ok: true,
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

export async function GET() {
  try {
    const userId = getUserIdFromRequest();
    const summary = await fetchSummary(userId);
    return NextResponse.json({ ok: true, summary });
  } catch (err) {
    console.error("GET /api/adherence error", err);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}

async function fetchSummary(userId: string) {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("adherence_logs")
    .eq("user_id", userId)
    .gte("created_at", sevenDaysAgo)
    .select("taken");

  if (error) {
    console.error("fetchSummary error", error);
    return { total: 0, takenCount: 0, percent: 0 };
  }

  const logs = (data ?? []) as Array<{ taken: boolean }>;
  const total = logs.length;
  const takenCount = logs.filter((log) => log.taken).length;
  const percent = total === 0 ? 0 : Math.round((takenCount / total) * 100);

  return { total, takenCount, percent };
}
