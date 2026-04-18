import { motion } from "framer-motion";
import type { Stats } from "../logic/types";
import { SectionLabel } from "./ui/SectionLabel";

interface Props {
  stats: Stats;
}

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export const DashboardView = ({ stats }: Props) => {
  const cards = [
    { label: "Sessions", value: stats.completedFocus, hint: "focus done" },
    { label: "Minutes", value: stats.totalFocusMinutes, hint: "deep work" },
    { label: "Cycle", value: stats.cycle, hint: "current" },
  ];

  const max = Math.max(...stats.weekly, 1);
  const todayIdx = new Date().getDay();

  return (
    <div className="h-full w-full p-4 flex flex-col gap-4 overflow-auto">
      <section>
        <SectionLabel className="mb-2">Today</SectionLabel>
        <div className="grid grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              className="bg-white dark:bg-zinc-900 p-2.5 flex flex-col gap-0.5"
            >
              <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {c.label}
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums leading-tight">
                {c.value}
              </p>
              <p className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500">{c.hint}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel className="mb-2">Last 7 days</SectionLabel>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3">
          <div className="flex items-end justify-between gap-1.5 h-16">
            {stats.weekly.map((v, i) => {
              const isToday = i === todayIdx;
              const heightPct = (v / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full">
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 flex items-end h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ delay: 0.1 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                      className={`w-full ${
                        isToday ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-400 dark:bg-zinc-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-mono text-[9px] ${
                      isToday
                        ? "text-zinc-900 dark:text-zinc-100 font-semibold"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {DAY_LABELS[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
