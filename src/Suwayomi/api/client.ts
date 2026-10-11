
import type { TypedDocumentString } from './generated/graphql.js'

interface GraphQLResponse<T> {
  data?: T | null
  errors?: { message: string }[]
}

export async function executeGraphQL<TData, TVariables>(
  serverUrl: string,
  document: TypedDocumentString<TData, TVariables>,
  variables?: TVariables,
): Promise<TData> {
  const baseUrl = serverUrl.trim().replace(/\/+$/, '')

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
  })

  if (response.status === 401 || response.status === 403) {
    throw new Error('Authentication is required or access was denied.')
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Server returned HTTP ${response.status}`)
  }

  let result: GraphQLResponse<TData>

  try {
    result = JSON.parse(
      Application.arrayBufferToUTF8String(body),
    ) as GraphQLResponse<TData>
  } catch {
    throw new Error('The server did not return valid JSON.')
  }

  if (result.errors?.length) {
    throw new Error(
      result.errors.map(error => error.message).join('; '),
    )
  }

  if (!result.data) {
    throw new Error('The GraphQL response contains no data.')
  }

  return result.data
}
