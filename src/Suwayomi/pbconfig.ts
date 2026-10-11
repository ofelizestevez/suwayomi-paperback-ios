import { ContentRating, SourceIntents, type ExtensionInfo } from "@paperback/types";

export default {
    name: "suwayomi",
    description: "Connect to your self-hosted Suwayomi server to browse manga, access your library, and read chapters directly in Paperback.",
    version: "0.0.1",
    icon: "icon.png",
    language: "en",
    contentRating: ContentRating.EVERYONE,
    developers: [
        {
        name: 'Oscar Feliz',
        github: 'https://github.com/ofelizestevez',
        }
    ],
    badges: [
        {
        label: 'Self Hosted',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        },
    ],
    capabilities: [
        SourceIntents.SETTINGS_FORM_PROVIDING,
        SourceIntents.MANAGED_COLLECTION_PROVIDING,
        SourceIntents.PROGRESS_PROVIDING,
        // SourceIntents.SEARCH_RESULT_PROVIDING,
        // SourceIntents.DISCOVER_SECTION_PROVIDING,
        SourceIntents.CHAPTER_PROVIDING,
    ]
} satisfies ExtensionInfo;