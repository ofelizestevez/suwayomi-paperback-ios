# Suwayomi for Paperback

<img src="https://github.com/Suwayomi/Suwayomi-Server/raw/master/server/src/main/resources/icon/faviconlogo.png" alt="drawing" width="200"/>

An unofficial [Paperback](https://paperback.moe) 0.9 extension that connects to [Suwayomi](https://github.com/Suwayomi/Suwayomi-Server), bringing your server's manga library and sources into Paperback on iOS.

## Features

The extension aims to support all six Paperback 0.9 intents, gradually expanding its capabilities as a Suwayomi client.

- [x] **Settings** — Configure and connect to your Suwayomi server.
- [x] **Managed Collections** — Browse your Suwayomi library and categories.
- [x] **Chapter Providing** — Retrieve chapters and read manga through Paperback.
- [x] **Progress Providing** — Synchronize chapter reading progress with Suwayomi.
- [ ] **Search Results** — Search manga across enabled Suwayomi sources.
- [ ] **Discover Sections** — Browse and discover manga from your sources.

## Installation

### Prerequisites

- **Paperback 0.9** installed on your device.
- A running [Suwayomi Server](https://github.com/Suwayomi/Suwayomi-Server#downloading-and-running-the-app), accessible from the device running Paperback.

**Network Requirements:**

- **Local Network:** HTTP connections using private LAN IP addresses may work.
- **Remote or VPN Access:** HTTPS is recommended and may be required due to Apple's App Transport Security (ATS).
- **Recommended:** Tailscale with HTTPS enabled through [Tailscale Services](https://tailscale.com/docs/features/tailscale-services) or [Tailscale Serve](https://tailscale.com/kb/1312/serve).

**Recommended Server Setup:** [Docker + Tailscale + Docktail](examples/docker/README.md) ([example Compose file](examples/docker/compose.yml)). Other installation methods and valid HTTPS configurations are also supported.

### Add to Paperback

1. On the device running Paperback, open the [extension repository](https://ofelizestevez.github.io/suwayomi-paperback-ios/0.9/stable/).
2. Tap **Add Repository to Paperback**.
3. Follow the prompts to **Add Repo**.
4. **Open** the Repo.
5. Install the **Suwayomi** extension.
6. In Paperback, open **Extension Settings → Settings → Server Settings** and enter your Suwayomi **base URL** (for example, `https://manga.your-tailnet.ts.net`).

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 24 and npm
- A running Suwayomi Server with an accessible GraphQL endpoint

### Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/ofelizestevez/suwayomi-paperback-ios.git
cd suwayomi-paperback-ios
npm ci
```

Create a `.env` file in the project root and configure your Suwayomi GraphQL endpoint:

```dotenv
SUWAYOMI_GRAPHQL_URL=https://your-server.example/api/graphql
```

Start the development server:

```bash
npm run dev
```

This starts both the **GraphQL Codegen watcher** and **Paperback CLI development server**. Changes to GraphQL operations automatically regenerate their TypeScript types, while Paperback's watcher rebuilds the extension.

### Available Commands

| Command           | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Start the development environment with automatic rebuilding |
| `npm run format`  | Format code using Oxfmt                                     |
| `npm run lint`    | Lint code using Oxlint                                      |
| `npm run codegen` | Generate TypeScript types from GraphQL operations           |
| `npm run check`   | Run formatting, linting, and type checks                    |

Run `npm run check` before committing changes.

## Credits

- [Inkdex](https://github.com/inkdex/template-extensions) — For their Paperback 0.9 extension template, used as a reference for project structure and tooling.
- [Tachidesk Paperback Extension](https://github.com/Suwayomi/tachidesk-paperback-ext) — The original Suwayomi integration for Paperback. Special thanks to all its [contributors](https://github.com/Suwayomi/tachidesk-paperback-ext/graphs/contributors) for their work on the original extension.
- [Suwayomi Team](https://github.com/Suwayomi) — For developing and maintaining the Suwayomi server and API.
- [Paperback Team](https://paperback.moe/) — For developing Paperback and its extension platform.
