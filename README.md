# Suwayomi for Paperback

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
## Credit
