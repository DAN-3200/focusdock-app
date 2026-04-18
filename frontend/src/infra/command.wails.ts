import * as wails from '../../../frontend/wailsjs/go/internal/App';

export class NativeCommands {
	static Minimizar = async () => {
		await wails.Minimize();
	};
	static FullScreen = async () => {
		await wails.ToggleMaximize();
	};
	static CloseWindow = async () => {
		await wails.CloseWindow();
	};
	static Notify = async (text: string) => {
		await wails.Notify(text);
	};
}
