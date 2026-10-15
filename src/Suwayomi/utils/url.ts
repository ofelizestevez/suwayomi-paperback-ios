export function normalizeServerUrl(value: string): string {
	return value.trim().replace(/\/+$/, '');
}

export function resolveServerUrl(serverUrl: string, path: string): string {
	if (/^https?:\/\//i.test(path)) {
		return path;
	}

	return `${normalizeServerUrl(serverUrl)}/${path.replace(/^\/+/, '')}`;
}

export function getMangaThumbnailUrl(
	serverUrl: string,
	manga: { id: number; thumbnailUrl: string | null },
): string {
	return resolveServerUrl(serverUrl, manga.thumbnailUrl || `/api/v1/manga/${manga.id}/thumbnail`);
}
