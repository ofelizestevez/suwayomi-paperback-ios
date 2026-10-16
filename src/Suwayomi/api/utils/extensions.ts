import { config } from '../../config';
import { executeGraphQL } from '../client';
import {
	ExtensionsDocument,
	RefreshExtensionsDocument,
	type ExtensionsQuery,
} from '../generated/graphql';

export type ExtensionSummary = ExtensionsQuery['extensions']['nodes'][number];

export async function getExtensions(): Promise<ExtensionSummary[]> {
	const result = await executeGraphQL(config.serverUrl, ExtensionsDocument);
	const { nodes, totalCount, pageInfo } = result.extensions;

	if (pageInfo.hasNextPage || nodes.length < totalCount) {
		throw new Error(
			`Incomplete extension catalogue: received ${nodes.length} of ${totalCount} extensions`,
		);
	}

	return nodes;
}

export async function refreshExtensions(): Promise<ExtensionSummary[]> {
	const result = await executeGraphQL(config.serverUrl, RefreshExtensionsDocument);

	if (!result.fetchExtensions) {
		throw new Error('The server did not confirm the catalogue refresh.');
	}

	return getExtensions();
}
