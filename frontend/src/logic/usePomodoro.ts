import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Mode, Settings, Stats } from './types';
import { NativeCommands } from '../infra/command.wails';
import { playCompletionSound } from '../infra/soundNotification';

export const DEFAULT_SETTINGS: Settings = {
	focus: 25,
	short: 5,
	long: 15,
	autoStart: false,
	dark: false,
};

const LONG_BREAK_EVERY = 4;

export interface PomodoroController {
	settings: Settings;
	setSettings: (s: Settings) => void;
	mode: Mode;
	setMode: (m: Mode) => void;
	secondsLeft: number;
	totalSeconds: number;
	progress: number;
	isRunning: boolean;
	toggle: () => void;
	reset: () => void;
	skip: () => void;
	stats: Stats;
}

export const usePomodoro = (
	initial: Settings = DEFAULT_SETTINGS,
): PomodoroController => {
	const [settings, setSettingsState] = useState<Settings>(initial);
	const [mode, setModeState] = useState<Mode>('focus');
	const [secondsLeft, setSecondsLeft] = useState<number>(initial.focus * 60);
	const [isRunning, setIsRunning] = useState(false);
	const [completedFocus, setCompletedFocus] = useState(0);
	const [cycle, setCycle] = useState(1);
	const [weekly, setWeekly] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

	const intervalRef = useRef<number | null>(null);

	const totalSeconds = settings[mode] * 60;
	const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;

	// ✅ Corrigido: só reage ao mode e à duração dele
	const currentModeDuration = settings[mode];

	useEffect(() => {
		setSecondsLeft(currentModeDuration * 60);
	}, [mode, currentModeDuration]);

	const handleComplete = useCallback(() => {
		NativeCommands.Notify(mode);
		playCompletionSound();

		setIsRunning(false);

		if (mode === 'focus') {
			const next = completedFocus + 1;
			setCompletedFocus(next);

			setWeekly((w) => {
				const today = new Date().getDay();
				const copy = [...w];
				copy[today] = (copy[today] ?? 0) + 1;
				return copy;
			});

			const nextMode: Mode =
				next % LONG_BREAK_EVERY === 0 ? 'long' : 'short';

			setModeState(nextMode);
			setSecondsLeft(settings[nextMode] * 60);

			if (settings.autoStart) setIsRunning(true);
		} else {
			setModeState('focus');
			setCycle((c) => c + 1);
			setSecondsLeft(settings.focus * 60);

			if (settings.autoStart) setIsRunning(true);
		}
	}, [mode, completedFocus, settings]);

	// Tick
	useEffect(() => {
		if (!isRunning) return;

		intervalRef.current = window.setInterval(() => {
			setSecondsLeft((s) => {
				if (s <= 1) {
					handleComplete();
					return 0;
				}
				return s - 1;
			});
		}, 1000);

		return () => {
			if (intervalRef.current) window.clearInterval(intervalRef.current);
		};
	}, [isRunning, handleComplete]);

	const setMode = useCallback(
		(m: Mode) => {
			setIsRunning(false);
			setModeState(m);
			setSecondsLeft(settings[m] * 60);
		},
		[settings],
	);

	const toggle = useCallback(() => {
		setIsRunning((r) => !r);
	}, []);

	const reset = useCallback(() => {
		setIsRunning(false);
		setSecondsLeft(settings[mode] * 60);
	}, [settings, mode]);

	const skip = useCallback(() => {
		handleComplete();
	}, [handleComplete]);

	const setSettings = useCallback((s: Settings) => {
		setSettingsState(s);
	}, []);

	const stats: Stats = useMemo(
		() => ({
			completedFocus,
			totalFocusMinutes: completedFocus * settings.focus,
			cycle,
			weekly,
		}),
		[completedFocus, settings.focus, cycle, weekly],
	);

	return {
		settings,
		setSettings,
		mode,
		setMode,
		secondsLeft,
		totalSeconds,
		progress,
		isRunning,
		toggle,
		reset,
		skip,
		stats,
	};
};

export const formatTime = (s: number) => {
	const m = Math.floor(s / 60)
		.toString()
		.padStart(2, '0');
	const sec = Math.max(0, s % 60)
		.toString()
		.padStart(2, '0');
	return `${m}:${sec}`;
};

export const modeLabel = (m: Mode): string =>
	m === 'focus'
		? 'Focus session'
		: m === 'short'
			? 'Short break'
			: 'Long break';
