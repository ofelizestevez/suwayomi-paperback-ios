import {
	ButtonRow,
	Form,
	LabelRow,
	NavigationRow,
	Section,
	TriStateSelectRow,
	type FormSectionElement,
} from '@paperback/types';

import { executeGraphQL } from '../../api/client';
import { SourceLanguagesDocument } from '../../api/generated/graphql';
import { config } from '../../config';
import { getLanguageName } from '../../utils/languages';
import { statusSection } from '../sections/status_section';
import { ExtensionsForm } from './extensions_form';
import { SearchSourceOrderForm } from './search_source_order_form';

type LanguageSelection = Record<string, 'included' | 'excluded'>;

export class SearchSettingsForm extends Form {
	private languageOptions: { id: string; title: string }[] = [];
	private loadingLanguages = false;
	private languageError?: string;

	override getSections(): FormSectionElement<unknown>[] {
		return [
			this.languageSection(),
			this.installedExtensionsSection(),
			this.searchSourceOrderSection(),
		];
	}

	override formWillAppear(): void {
		void this.loadLanguages();
	}

	languageSection() {
		if (this.loadingLanguages) {
			return statusSection('sourceLanguages', 'Loading source languages...');
		}

		if (this.languageError) {
			return Section('sourceLanguages', [
				LabelRow('error', {
					title: this.languageError,
				}),
				ButtonRow('retryLanguages', {
					title: 'Retry',
					onSelect: Application.Selector(this as SearchSettingsForm, 'retryLanguages'),
				}),
			]);
		}

		const enabledLanguages = new Set(config.sourceLanguages);

		const value: LanguageSelection = Object.fromEntries(
			config.sourceLanguages.map((lang) => [lang, 'included']),
		);

		const items = this.languageOptions.toSorted((a, b) => {
			// Multi-language always comes first
			if (a.id === 'all') {
				return -1;
			}
			if (b.id === 'all') {
				return 1;
			}

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
					this as SearchSettingsForm,
					'onLanguagesChanged',
				),
			}),
		]);
	}

	installedExtensionsSection() {
		return Section({ id: 'Extensions' }, [
			NavigationRow('Extensions', {
				title: 'Extensions',
				form: new ExtensionsForm(),
			}),
		]);
	}

	searchSourceOrderSection() {
		return Section({ id: 'SearchSourceOrder' }, [
			NavigationRow('SearchSourceOrder', {
				title: 'Search Source Order',
				form: new SearchSourceOrderForm(),
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
		if (this.loadingLanguages) {
			return;
		}

		this.loadingLanguages = true;
		this.languageError = undefined;
		this.reloadForm();

		try {
			const result = await executeGraphQL(config.serverUrl, SourceLanguagesDocument);

			const languages = result.sources.nodes.map((source) => source.lang);

			this.languageOptions = [...new Set([...languages, ...config.sourceLanguages])]
				.filter((lang) => lang !== 'localsourcelang')
				.map((lang) => ({
					id: lang,
					title: getLanguageName(lang),
				}));
		} catch (error) {
			this.languageError =
				error instanceof Error ? error.message : 'Failed to load source languages.';
		} finally {
			this.loadingLanguages = false;
			this.reloadForm();
		}
	}

	async retryLanguages(): Promise<void> {
		await this.loadLanguages();
	}
}
