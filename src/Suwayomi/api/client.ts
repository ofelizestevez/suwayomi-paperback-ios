import { normalizeServerUrl } from '../utils/url';
import type { TypedDocumentString } from './generated/graphql';

interface GraphQLResponse<T> {
	data?: T | null;
	errors?: { message: string }[];
}

export async function executeGraphQL<TData, TVariables>(
	serverUrl: string,
	document: TypedDocumentString<TData, TVariables>,
	variables?: TVariables,
): Promise<TData> {
	const baseUrl = normalizeServerUrl(serverUrl);

	if (!baseUrl) {
		throw new Error('Configure your Suwayomi server first.');
	}

	const [response, body] = await Application.scheduleRequest({
		url: `${baseUrl}/api/graphql`,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			query: document.toString(),
			variables,
		}),
	});

	if (response.status === 401 || response.status === 403) {
		throw new Error('Authentication is required or access was denied.');
	}

	if (response.status < 200 || response.status >= 300) {
		throw new Error(`Server returned HTTP ${response.status}`);
	}

	let result: GraphQLResponse<TData>;

	try {
		result = JSON.parse(Application.arrayBufferToUTF8String(body)) as GraphQLResponse<TData>;
	} catch {
		throw new Error('The server did not return valid JSON.');
	}

	if (!result || typeof result !== 'object' || Array.isArray(result)) {
		throw new Error('The server did not return a GraphQL response.');
	}

	if (result.errors != null && !Array.isArray(result.errors)) {
		throw new Error('The GraphQL response contains invalid errors.');
	}

	if (result.errors?.length) {
		const messages = result.errors.map((error) =>
			typeof error?.message === 'string' ? error.message : 'Unknown GraphQL error.',
		);

		throw new Error(messages.join('; '));
	}

	if (!result.data) {
		throw new Error('The GraphQL response contains no data.');
	}

	return result.data;
}
