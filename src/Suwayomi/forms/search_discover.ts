import { Form, Section, TriStateSelectRow, type FormSectionElement } from '@paperback/types';

import { executeGraphQL } from '../api/client';
import { SourceLanguagesDocument } from '../api/generated/graphql';
import { config } from '../config.js';

type LanguageSelection = Record<string, 'included' | 'excluded'>;

function getLanguageName(code: string): string {
	if (code === 'all') return 'Multi-language';
	if (code === 'localsourcelang') return 'Local Source';

	try {
		const displayNames = new Intl.DisplayNames(['en'], {
			type: 'language',
		});

		return displayNames.of(code) ?? code;
	} catch {
		return code;
	}
}

export class SearchDiscoverForm extends Form {
	private languages: { id: string; title: string }[] = [];

	override getSections(): FormSectionElement<unknown>[] {
		return [this.languageSection()];
	}

	override formWillAppear(): void {
		void this.loadLanguages();
	}

	languageSection() {
		const enabledLanguages = new Set(config.sourceLanguages);

		const value: LanguageSelection = Object.fromEntries(
			config.sourceLanguages.map((lang) => [lang, 'included']),
		);

		const items = [...this.languages].sort((a, b) => {
			// Multi-language always comes first
			if (a.id === 'all') return -1;
			if (b.id === 'all') return 1;

			// Enabled languages come next
			const aEnabled = enabledLanguages.has(a.id);
			const bEnabled = enabledLanguages.has(b.id);

			if (aEnabled !== bEnabled) {
				return aEnabled ? -1 : 1;
			}

			// Alphabetical within each group
			return a.title.localeCompare(b.title);
		});

		return Section({ id: 'sourceLanguages' }, [
			TriStateSelectRow('sourceLanguages', {
				title: 'Source Languages',
				layout: 'list',
				value,
				items,
				allowExclusion: false,
				allowEmptySelection: true,
				onValueChange: Application.Selector(
					this as SearchDiscoverForm,
					'onLanguagesChanged',
				),
			}),
		]);
	}

	async onLanguagesChanged(value: LanguageSelection): Promise<void> {
		config.sourceLanguages = Object.entries(value)
			.filter(([, state]) => state === 'included')
			.map(([lang]) => lang);

		this.reloadForm();
	}

	private async loadLanguages(): Promise<void> {
		try {
			const result = await executeGraphQL(config.serverUrl, SourceLanguagesDocument);

			const languages = result.sources.nodes.map((source) => source.lang);

			this.languages = [...new Set([...languages, ...config.sourceLanguages])]
				.filter((lang) => lang !== 'localsourcelang')
				.map((lang) => ({
					id: lang,
					title: getLanguageName(lang),
				}));

			this.reloadForm();
		} catch (error) {
			console.error('Failed to load source languages:', error);
		}
	}
}
