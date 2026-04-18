import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import type { Settings } from "../logic/types";
import { SectionLabel } from "./ui/SectionLabel";

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
}

type DurationKey = "focus" | "short" | "long";

const FIELDS: { key: DurationKey; label: string; min: number; max: number }[] = [
  { key: "focus", label: "Focus", min: 1, max: 90 },
  { key: "short", label: "Short break", min: 1, max: 30 },
  { key: "long", label: "Long break", min: 1, max: 60 },
];

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const Toggle = ({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: () => void;
  id: string;
}) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative w-9 h-5 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 ${checked ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-300 dark:bg-zinc-700"
      }`}
  >
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`absolute rounded-xs top-0.5 w-4 h-4 ${checked ? "bg-white dark:bg-zinc-900 left-[18px]" : "bg-white dark:bg-zinc-300 left-0.5"
        }`}
    />
  </button>
);

export const ConfigView = ({ settings, onChange }: Props) => {
  const updateDuration = (key: DurationKey, raw: string, min: number, max: number) => {
    const next = clamp(Number(raw) || min, min, max);
    onChange({ ...settings, [key]: next });
  };

  return (
    <div className="h-full w-full p-4 flex flex-col gap-3 overflow-auto">
      <SectionLabel>Durations · minutes</SectionLabel>

      <div className="flex flex-col gap-2">
        {FIELDS.map((f, i) => (
          <motion.div
            key={f.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2"
          >
            <label htmlFor={`cfg-${f.key}`} className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {f.label}
            </label>

            <div className="flex items-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950">
              <button
                type="button"
                onClick={() => updateDuration(f.key, String(settings[f.key] - 1), f.min, f.max)}
                className="w-7 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-r border-zinc-300 dark:border-zinc-700 select-none"
              >
                <svg viewBox="0 0 10 2" width="10" height="2" fill="currentColor">
                  <rect width="10" height="2" rx="1" />
                </svg>
              </button>

              <input
                id={`cfg-${f.key}`}
                type="number"
                min={f.min}
                max={f.max}
                value={settings[f.key]}
                onChange={(e) => updateDuration(f.key, e.target.value, f.min, f.max)}
                className="w-10 font-mono text-xs text-center py-2 bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                type="button"
                onClick={() => updateDuration(f.key, String(settings[f.key] + 1), f.min, f.max)}
                className="w-7 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-l border-zinc-300 dark:border-zinc-700 select-none"
              >
                <svg viewBox="0 0 10 10" width="10" height="10" fill="currentColor">
                  <rect x="4" y="0" width="2" height="10" rx="1" />
                  <rect x="0" y="4" width="10" height="2" rx="1" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <SectionLabel className="mt-1">Preferences</SectionLabel>

      <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2">
        <label htmlFor="cfg-auto" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Auto-start next
        </label>
        <Toggle
          id="cfg-auto"
          checked={settings.autoStart}
          onChange={() => onChange({ ...settings, autoStart: !settings.autoStart })}
        />
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2">
        <label htmlFor="cfg-dark" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 inline-flex items-center gap-1.5">
          <motion.span
            key={settings.dark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            {settings.dark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </motion.span>
          Switch theme
        </label>
        <Toggle
          id="cfg-dark"
          checked={settings.dark}
          onChange={() => onChange({ ...settings, dark: !settings.dark })}
        />
      </div>

      <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 mt-auto">
        Changes apply on next session.
      </p>
      <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 mt-auto">
        © {new Date().getFullYear()} Daniel Barros Moreira. Licensed under the MIT License.
      </p>
    </div>
  );
};
