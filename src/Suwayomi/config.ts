const KEYS = {
	serverUrl: 'suwayomi.serverUrl',
	showRecentlyUpdated: 'suwayomi.showRecentlyUpdated',
	showContinueReading: 'suwayomi.showContinueReading',
} as const;

export const config = {
	get serverUrl(): string {
		const value = Application.getState(KEYS.serverUrl);

		return typeof value === 'string' ? value : '';
	},

	set serverUrl(value: string) {
		Application.setState(value, KEYS.serverUrl);
	},
};
