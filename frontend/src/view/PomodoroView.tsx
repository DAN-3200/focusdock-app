import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import type { Mode } from "../logic/types";
import { formatTime, modeLabel } from "../logic/usePomodoro";
import { SectionLabel } from "./ui/SectionLabel";
import { IconButton } from "./ui/IconButton";
import { SegmentedTabs } from "./ui/SegmentedTabs";

interface Props {
  mode: Mode;
  onModeChange: (m: Mode) => void;
  secondsLeft: number;
  progress: number;
  isRunning: boolean;
  cycle: number;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
}

const MODE_ITEMS: { key: Mode; label: string }[] = [
  { key: "focus", label: "Focus" },
  { key: "short", label: "Short" },
  { key: "long", label: "Long" },
];

export const PomodoroView = ({
  mode,
  onModeChange,
  secondsLeft,
  progress,
  isRunning,
  cycle,
  onToggle,
  onReset,
  onSkip,
}: Props) => {
  const progressPct = Math.round(progress * 100);

  return (
    <div className="h-full w-full flex flex-col p-4 gap-4">
      <SegmentedTabs items={MODE_ITEMS} active={mode} onChange={onModeChange} />

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <SectionLabel>{modeLabel(mode)}</SectionLabel>
        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: 1,
            scale: isRunning ? [1, 1.015, 1] : 1,
          }}
          transition={
            isRunning
              ? { scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.25 } }
              : { duration: 0.25 }
          }
          className="font-mono text-6xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums"
        >
          {formatTime(secondsLeft)}
        </motion.div>

        <div
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          className="w-[70%] h-1 bg-zinc-200 dark:bg-zinc-800 rounded"
        >
          <motion.div
            className="h-full bg-zinc-900 dark:bg-zinc-100 animate-pulse"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </div>

        <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
          cycle <span className="text-zinc-700 dark:text-zinc-300">{cycle}</span> · {progressPct}%
        </p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <IconButton label="Reiniciar" onClick={onReset}>
          <RotateCcw className="w-4 h-4" strokeWidth={2} />
        </IconButton>

        <motion.button
          type="button"
          onClick={onToggle}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 transition-colors min-w-[110px] justify-center"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" strokeWidth={2.5} /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" strokeWidth={2.5} /> Start
            </>
          )}
        </motion.button>

        <IconButton label="Pular" onClick={onSkip}>
          <SkipForward className="w-4 h-4" strokeWidth={2} />
        </IconButton>
      </div>
    </div>
  );
};
