export type Mode = "focus" | "short" | "long";

export type TabKey = "pomodoro" | "dashboard" | "config";

export interface Settings {
  focus: number;
  short: number;
  long: number;
  autoStart: boolean;
  dark: boolean;
}

export interface Stats {
  completedFocus: number;
  totalFocusMinutes: number;
  cycle: number;
  weekly: number[]; // 7 entries, Sun..Sat
}
