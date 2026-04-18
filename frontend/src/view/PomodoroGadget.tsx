import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TitleBar } from "./TitleBar";
import { PomodoroView } from "./PomodoroView";
import { DashboardView } from "./DashboardView";
import { ConfigView } from "./ConfigView";
import { usePomodoro } from "../logic/usePomodoro";
import type { TabKey } from "../logic/types";

export const PomodoroGadget = () => {
  const [tab, setTab] = useState<TabKey>("pomodoro");
  const pomo = usePomodoro();
  const isDark = pomo.settings.dark;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={isDark ? "dark" : ""}
    >
      <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl h-screen p-2 flex flex-col gap-2 transition-colors duration-300">
        <TitleBar active={tab} onChange={setTab} />
        <div className="bg-white dark:bg-zinc-950 border rounded border-zinc-200 dark:border-zinc-800 flex-1 overflow-hidden relative transition-colors duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {tab === "pomodoro" && (
                <PomodoroView
                  mode={pomo.mode}
                  onModeChange={pomo.setMode}
                  secondsLeft={pomo.secondsLeft}
                  progress={pomo.progress}
                  isRunning={pomo.isRunning}
                  cycle={pomo.stats.cycle}
                  onToggle={pomo.toggle}
                  onReset={pomo.reset}
                  onSkip={pomo.skip}
                />
              )}
              {tab === "dashboard" && <DashboardView stats={pomo.stats} />}
              {tab === "config" && (
                <ConfigView settings={pomo.settings} onChange={pomo.setSettings} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
