import { config } from '../../config';
import { executeGraphQL } from '../client';
import {
	UpdateSourcePreferenceDocument,
	type SourcePreferenceChangeInput,
} from '../generated/graphql';
import type { SourcePreferences } from './sources';

export async function updateSourcePreference(
	sourceId: string,
	change: SourcePreferenceChangeInput,
): Promise<SourcePreferences> {
	const result = await executeGraphQL(config.serverUrl, UpdateSourcePreferenceDocument, {
		sourceId,
		change,
	});

	if (!result.updateSourcePreference) {
		throw new Error('The server did not confirm the preference change.');
	}

	return result.updateSourcePreference.preferences;
}
