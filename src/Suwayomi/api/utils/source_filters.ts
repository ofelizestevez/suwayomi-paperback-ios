import { config } from '../../config';
import { executeGraphQL } from '../client';
import { SourceFiltersDocument, type SourceFiltersQuery } from '../generated/graphql';

export type SourceFilters = NonNullable<SourceFiltersQuery['source']>['filters'];

export async function getSourceFilters(sourceId: string): Promise<SourceFilters> {
	const result = await executeGraphQL(config.serverUrl, SourceFiltersDocument, {
		sourceId,
	});

	if (!result.source) {
		throw new Error(`Source ${sourceId} not found.`);
	}

	return result.source.filters;
}
