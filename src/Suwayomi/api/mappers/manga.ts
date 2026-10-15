import { ContentRating, type SourceManga } from '@paperback/types';
import slugify from 'slugify';

import { getMangaThumbnailUrl, resolveServerUrl } from '../../utils/url';
import type { Manga_FieldsFragment as SuwayomiManga } from '../generated/graphql';

export function toSourceManga(manga: SuwayomiManga, serverUrl: string): SourceManga {
	return {
		mangaId: String(manga.id),
		mangaInfo: {
			primaryTitle: manga.title,
			secondaryTitles: [],
			synopsis: manga.description ?? '',
			tagGroups: [
				{
					id: 'genres',
					title: 'Genres',
					tags: manga.genre.map((genre) => ({
						id: slugify(genre, { lower: true, strict: true }),
						title: genre,
					})),
				},
			],
			contentRating: ContentRating.EVERYONE,
			contentType: 'comic',
			status: manga.status,
			artist: manga.artist ?? undefined,
			author: manga.author ?? undefined,
			thumbnailUrl: getMangaThumbnailUrl(serverUrl, manga),
			shareUrl: resolveServerUrl(serverUrl, `/manga/${manga.id}`),
		},
	};
}
