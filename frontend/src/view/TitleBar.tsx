import { Timer, BarChart3, Settings as SettingsIcon, Minus, X, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { TabKey } from "../logic/types";
import { NativeCommands } from "../infra/command.wails";

interface Props {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  onMinimize?: () => void;
  onClose?: () => void;
}

const TABS: { key: TabKey; label: string; Icon: LucideIcon }[] = [
  { key: "pomodoro", label: "Timer", Icon: Timer },
  { key: "dashboard", label: "Stats", Icon: BarChart3 },
  { key: "config", label: "Config", Icon: SettingsIcon },
];

export const TitleBar = ({ active, onChange, onMinimize, onClose }: Props) => (
  <div className="h-8 w-full wails-draggable flex items-center justify-between px-1 select-none">
    <div className="flex gap-1">
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <motion.button
            key={key}
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={() => onChange(key)}
            whileTap={{ scale: 0.94 }}
            className={`relative inline-flex items-center gap-1.5 px-2 py-1 text-[12px] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-900 ${
              isActive
                ? "text-white dark:text-zinc-900"
                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-tab"
                className="absolute inset-0 rounded-xs bg-zinc-900 dark:bg-zinc-100 -z-0"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon className="w-3 h-3 relative z-10" strokeWidth={2} />
            <span className="relative z-10">{label}</span>
          </motion.button>
        );
      })}
    </div>

    <div className="flex gap-1">
      <motion.button
        type="button"
        aria-label="Minimizar"
        onClick={NativeCommands.Minimizar}
        whileTap={{ scale: 0.9 }}
        className="p-2 grid place-items-center bg-transparent hover:bg-white/20 rounded-xs text-white transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-900"
      >
        <Minus className="w-3 h-3" strokeWidth={2.5} />
      </motion.button>
      <motion.button
        type="button"
        aria-label="Fechar"
        onClick={NativeCommands.CloseWindow}
        whileTap={{ scale: 0.9 }}
        className="p-2 grid place-items-center bg-transparent rounded-xs hover:bg-red-500/50 text-white transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-900"
      >
        <X className="w-3 h-3 font-bold" strokeWidth={3} />
      </motion.button>
    </div>
  </div>
);
