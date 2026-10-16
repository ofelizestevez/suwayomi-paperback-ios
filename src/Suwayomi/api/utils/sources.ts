import { config } from '../../config';
import { executeGraphQL } from '../client';
import {
	InstalledExtensionsDocument,
	SourceDetailsDocument,
	type InstalledExtensionsQuery,
	type SourceDetailsQuery,
} from '../generated/graphql';

export type InstalledExtension = InstalledExtensionsQuery['extensions']['nodes'][number];

export type InstalledSource = InstalledExtension['source']['nodes'][number];

export type SearchSource = InstalledSource & {
	extensionName: string;
};

export type SourcePreferences = NonNullable<SourceDetails['preferences']>;

export type SourceDetails = SourceDetailsQuery['source'];

export async function getEnabledSearchSources(): Promise<SearchSource[]> {
	const result = await executeGraphQL(config.serverUrl, InstalledExtensionsDocument);

	const priority = new Map(config.searchSourceOrder.map((id, index) => [id, index]));

	return result.extensions.nodes
		.flatMap((extension) =>
			extension.source.nodes.map((source) => ({
				...source,
				extensionName: extension.name,
			})),
		)
		.filter((source) => config.isSourceEnabled(source))
		.toSorted((a, b) => {
			const aPriority = priority.get(a.id) ?? Infinity;
			const bPriority = priority.get(b.id) ?? Infinity;

			if (aPriority !== bPriority) {
				return aPriority - bPriority;
			}

			return a.extensionName.localeCompare(b.extensionName) || a.lang.localeCompare(b.lang);
		});
}

export async function getSourceDetails(
	sourceId: string,
	includePreferences: boolean,
): Promise<SourceDetails> {
	const result = await executeGraphQL(config.serverUrl, SourceDetailsDocument, {
		sourceId,
		includePreferences,
	});

	return result.source;
}
