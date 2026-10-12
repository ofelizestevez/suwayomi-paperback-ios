import type { SourceLanguagesQuery } from '../api/generated/graphql.js';

export function getAvailableLanguages(data: SourceLanguagesQuery): string[] {
	return [
		...new Set(
			data.sources.nodes.map((source) => source.lang).filter((lang) => lang.length > 0),
		),
	].sort();
}
