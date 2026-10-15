const KEYS = {
	serverUrl: 'suwayomi.serverUrl',
	sourceLanguages: 'suwayomi.sourceLanguages',
	sourceOverrides: 'suwayomi.sourceOverrides',
	searchSourceOrder: 'suwayomi.searchSourceOrder',
} as const;

type Source = {
	id: string;
	lang: string;
};

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

	get sourceOverrides(): Record<string, boolean> {
		return (
			(Application.getState(KEYS.sourceOverrides) as Record<string, boolean> | undefined) ??
			{}
		);
	},

	set sourceOverrides(value: Record<string, boolean>) {
		Application.setState(value, KEYS.sourceOverrides);
	},

	isSourceEnabled(source: Source): boolean {
		return this.sourceOverrides[source.id] ?? this.sourceLanguages.includes(source.lang);
	},

	setSourceEnabled(sourceId: string, enabled: boolean): void {
		this.sourceOverrides = {
			...this.sourceOverrides,
			[sourceId]: enabled,
		};
	},

	get searchSourceOrder(): string[] {
		return (Application.getState(KEYS.searchSourceOrder) as string[] | undefined) ?? [];
	},

	set searchSourceOrder(value: string[]) {
		Application.setState(value, KEYS.searchSourceOrder);
	},
};
