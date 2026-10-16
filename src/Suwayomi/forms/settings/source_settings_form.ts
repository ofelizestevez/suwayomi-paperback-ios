import {
	ButtonRow,
	Form,
	LabelRow,
	Section,
	ToggleRow,
	type FormSectionElement,
} from '@paperback/types';

import type { SourcePreferenceChangeInput } from '../../api/generated/graphql';
import { updateSourcePreference } from '../../api/utils/source_preferences';
import { getSourceDetails, type SourceDetails } from '../../api/utils/sources';
import { config } from '../../config';
import { statusSection } from '../sections/status_section';
import { buildPreferenceSections } from './preference_renderer';

const contentWarningLabels = {
	SAFE: 'Safe',
	MIXED: 'Mixed',
	NSFW: 'NSFW',
};

export class SourceSettingsForm extends Form {
	private loading = false;
	private error?: string;

	private saving = false;
	private preferenceError?: string;

	constructor(private source: SourceDetails) {
		super();

		if (source.isConfigurable) {
			void this.loadSourceDetails();
		}
	}

	override getSections(): FormSectionElement<unknown>[] {
		const sections = [
			Section({ id: 'sourceInfo', header: 'Source' }, [
				LabelRow('displayName', {
					title: 'Name',
					value: this.source.displayName,
				}),
				LabelRow('contentWarning', {
					title: 'Content Warning',
					value: contentWarningLabels[this.source.contentWarning],
				}),
			]),

			Section({ id: 'settings', header: 'Paperback' }, [
				ToggleRow('enabled', {
					title: 'Enabled',
					value: config.isSourceEnabled(this.source),
					onValueChange: Application.Selector(
						this as SourceSettingsForm,
						'onEnabledChanged',
					),
				}),
			]),
		];

		if (this.loading || this.saving) {
			return [
				...sections,
				statusSection(
					'sourceStatus',
					this.saving ? 'Saving source preference...' : 'Loading source settings...',
				),
			];
		}

		if (this.error) {
			return [
				...sections,
				Section('sourceError', [
					LabelRow('error', {
						title: this.error,
					}),
					ButtonRow('retry', {
						title: 'Retry',
						onSelect: Application.Selector(this as SourceSettingsForm, 'retryLoad'),
					}),
				]),
			];
		}

		if (this.preferenceError) {
			sections.push(statusSection('preferenceError', this.preferenceError));
		}

		if (!this.source.isConfigurable) {
			sections.push(
				statusSection('preferences', 'This source has no configurable preferences.'),
			);
		} else {
			const preferences = this.source.preferences ?? [];

			if (preferences.length === 0) {
				sections.push(statusSection('preferences', 'No source preferences available.'));
			} else {
				sections.push(
					...buildPreferenceSections(preferences, this, (change) =>
						this.savePreference(change),
					),
				);
			}
		}

		return sections;
	}

	async onEnabledChanged(enabled: boolean): Promise<void> {
		config.setSourceEnabled(this.source.id, enabled);
		this.reloadForm();
	}

	async retryLoad(): Promise<void> {
		await this.loadSourceDetails();
	}

	private async loadSourceDetails(): Promise<void> {
		if (this.loading || this.saving) return;

		this.loading = true;
		this.error = undefined;
		this.preferenceError = undefined;
		this.reloadForm();

		try {
			this.source = await getSourceDetails(this.source.id, this.source.isConfigurable);
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to load source settings.';
		} finally {
			this.loading = false;
			this.reloadForm();
		}
	}

	private async savePreference(change: SourcePreferenceChangeInput): Promise<void> {
		if (this.loading || this.saving) {
			throw new Error('Wait for the current preference operation to finish.');
		}

		const preference = this.source.preferences?.[change.position];

		if (!this.source.isConfigurable || !preference?.visible || !preference.enabled) {
			throw new Error('This preference is no longer editable. Reload source settings.');
		}

		this.saving = true;
		this.preferenceError = undefined;
		this.reloadForm();

		try {
			this.source.preferences = await updateSourcePreference(this.source.id, change);
		} catch (error) {
			this.preferenceError =
				error instanceof Error ? error.message : 'Failed to save source preference.';

			throw error;
		} finally {
			this.saving = false;
			this.reloadForm();
		}
	}
}
