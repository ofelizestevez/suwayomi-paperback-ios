const KEYS = {
	serverUrl: 'suwayomi.serverUrl',
	sourceLanguages: 'suwayomi.sourceLanguages',
} as const;

export const config = {
	get serverUrl(): string {
		const value = Application.getState(KEYS.serverUrl);

		return typeof value === 'string' ? value : '';
	},

	set serverUrl(value: string) {
		Application.setState(value, KEYS.serverUrl);
	},

	get sourceLanguages(): string[] {
		return (
			(Application.getState(KEYS.sourceLanguages) as string[] | undefined) ?? ['en', 'all']
		);
	},

	set sourceLanguages(value: string[]) {
		Application.setState(value, KEYS.sourceLanguages);
	},
};
