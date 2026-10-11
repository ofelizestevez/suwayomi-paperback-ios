import { ContentRating, type SourceManga } from "@paperback/types";
import type { MangaDetailsQuery } from "../generated/graphql"
import slugify from 'slugify';

type SuwayomiManga = MangaDetailsQuery['manga']

export function toSourceManga(manga: SuwayomiManga, serverUrl: string) : SourceManga {

    return {
    mangaId: String(manga.id),
    mangaInfo: {
        primaryTitle: manga.title,
        secondaryTitles: [],
        synopsis: manga.description ?? "",
        tagGroups: [
            {
            id: 'genres',
            title: 'Genres',
            tags: manga.genre.map(genre => ({
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
        thumbnailUrl: serverUrl + manga.thumbnailUrl,
        shareUrl: serverUrl + "/manga/" + manga.id,
    }
}
}