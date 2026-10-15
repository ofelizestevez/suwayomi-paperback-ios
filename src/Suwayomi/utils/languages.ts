export function getLanguageName(code: string): string {
	if (code === 'all') {
		return 'Multi-language';
	}
	if (code === 'localsourcelang') {
		return 'Local Source';
	}

	try {
		const displayNames = new Intl.DisplayNames(['en'], {
			type: 'language',
		});

		return displayNames.of(code) ?? code;
	} catch {
		return code;
	}
}

export function getChapterLanguageCode(code?: string | null): string {
	return code && code !== 'all' ? code : 'und';
}
