"use client";

import { WeeklyWorkout } from "@/lib/api/useWeeklyPlanQuery";
import { MotionWrapper } from "@/components/motion-wrapper";

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function WeeklyCalendar({ week }: { week: WeeklyWorkout[] }) {
  // agrupamos entrenos por día (0..6)
  const byDay: Record<number, WeeklyWorkout[]> = {};
  for (let i = 0; i < 7; i++) {
    byDay[i] = [];
  }
  for (const w of week) {
    if (!byDay[w.day]) byDay[w.day] = [];
    byDay[w.day].push(w);
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[600px] grid-cols-7 gap-2 text-xs">
        {DAYS.map((label, dayIdx) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-[var(--surface)] p-2 flex flex-col gap-2"
          >
            <div className="text-[var(--text-primary)] font-medium leading-none flex items-baseline justify-between">
              <span>{label}</span>
              <span className="text-[10px] text-[var(--text-secondary)] font-normal leading-none">
                {byDay[dayIdx]?.length || 0} ses.
              </span>
            </div>

            {byDay[dayIdx].length === 0 ? (
              <div className="text-[var(--text-secondary)] text-[10px] leading-relaxed italic">
                Descanso / libre
              </div>
            ) : (
              byDay[dayIdx].map((block) => (
                <MotionWrapper keyId={`wk-${block.id}`} key={block.id}>
                  <div className="rounded-md border border-border bg-[var(--bg)] p-2 shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[var(--text-primary)] font-medium leading-snug">
                        {block.type}
                      </div>
                      {block.intensity && (
                        <span className="text-[10px] px-2 py-[2px] rounded-full border border-border leading-none capitalize text-[var(--text-secondary)]">
                          {block.intensity}
                        </span>
                      )}
                    </div>

                    <div className="text-[var(--text-secondary)] text-[10px] leading-none">
                      {block.start} - {block.end}
                    </div>

                    <div className="border-t border-border/50 pt-1 space-y-1">
                      {block.nutrition.map((n, i) => (
                        <div
                          key={i}
                          className="text-[10px] leading-snug text-[var(--text-primary)]"
                        >
                          <div className="font-medium">
                            {n.label}
                          </div>
                          <div className="text-[var(--text-secondary)]">
                            {n.advice}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MotionWrapper>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
