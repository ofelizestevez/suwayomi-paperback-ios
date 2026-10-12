# Recommended Suwayomi Server Setup

This optional example runs **Suwayomi**, **Tailscale**, and **Docktail** together with Docker Compose. It exposes Suwayomi as a **private Tailscale HTTPS service**, without publishing Suwayomi's port to the internet. You can use any other setup that provides an HTTPS URL accessible from your Paperback device.

> This example targets a **Linux Docker host** with `/dev/net/tun` available. Docker Desktop on macOS/Windows and rootless Docker may need a different networking setup. Image versions are examples, not an automatic update policy.

## 1. Prepare Tailscale

1. Create or join a [Tailscale tailnet](https://tailscale.com/docs/how-to/quickstart), then install and sign in to Tailscale on the **iPhone/iPad running Paperback**.
2. In the [Tailscale DNS settings](https://login.tailscale.com/admin/dns), **enable MagicDNS** and **enable HTTPS certificates**. Both are necessary for the recommended `https://manga.<tailnet>.ts.net` address.
3. Create a tagged Tailscale [auth key](https://tailscale.com/docs/features/auth-keys) for `tag:server`. The key will join the Docker Tailscale sidecar to your tailnet.
4. Follow [Docktail's Tailscale Admin Setup](https://docktail.org/docs/) to create an **OAuth client** with appropriate permissions and configure Service tags/approval. For a tagged-host setup, the relevant policy entries look like the example below. **Merge these into your existing tailnet policy; do not overwrite it.**

```json
{
  "tagOwners": {
    "tag:server": ["autogroup:admin"],
    "tag:container": ["tag:server"]
  },
  "autoApprovers": {
    "services": {
      "tag:container": ["tag:server"]
    }
  }
}
```

Docktail's documentation covers which OAuth scopes to grant, how to approve the service, and how to give your devices permission to access it. The Tailscale admin setup is **not** handled by Compose.

## 2. Start the containers

From this `examples/docker/` directory:

```bash
cp .env.example .env
# Edit .env: set TS_AUTHKEY and the two TAILSCALE_OAUTH_* values.
mkdir -p suwayomi-data
# Ensure ./suwayomi-data is writable by the PUID/PGID in .env.
docker compose -f compose.yml up -d
docker compose -f compose.yml logs -f tailscale docktail suwayomi
```

The example uses named volumes for Tailscale's state/socket and a local `suwayomi-data/` directory for your persistent Suwayomi library and settings. Neither `.env` nor the data directory should be committed to Git.

Suwayomi uses **HTTP on port 4567 inside Docker**. Docktail exposes it with **HTTPS on the Tailscale service address**; no host port publishing is needed.

The bundled example uses only the core services. Optional extras such as FlareSolverr/Byparr can be added later if needed; they aren't required for basic installation.

## 3. Verify and connect

1. In the [Tailscale Services admin page](https://login.tailscale.com/admin/services), verify that the `manga` service has been created and its host is approved (unless your policy auto-approves it).
2. From the **Paperback device** with Tailscale connected, open `https://manga.<your-tailnet>.ts.net` in Safari. You should reach Suwayomi and see a valid HTTPS certificate.
3. In Paperback's **Suwayomi → Settings → Server Settings**, enter that address as the **base URL**, without `/api/graphql` or any extra path.

If it doesn't connect, verify MagicDNS, HTTPS certificate settings, Service host approval, Tailscale access policies, that the iOS device is connected to the same tailnet, and whether Suwayomi is running (`docker compose ps`). You do **not** need Tailscale Funnel or a public internet-facing port for this example.

## Security and maintenance

- **Do not commit `.env`, Tailscale authentication keys, OAuth secrets, or `suwayomi-data/`.** Add entries for these to the repository `.gitignore`.
- The mounted Docker socket gives Docktail substantial control over the Docker host even with `:ro`; run this stack only on a host you trust.
- Keep Tailscale, Docktail, and Suwayomi images updated after reviewing their release notes, and back up `suwayomi-data/`.
- Tailscale Services and HTTPS are an **option**, not a requirement. If you already have a properly secured HTTPS reverse proxy, you can use that address instead.

## References

- [Suwayomi Server installation](https://github.com/Suwayomi/Suwayomi-Server#downloading-and-running-the-app)
- [Suwayomi official Docker example](https://github.com/Suwayomi/Suwayomi-Server-docker)
- [Docker Compose documentation](https://docs.docker.com/compose/)
- [Tailscale quickstart](https://tailscale.com/docs/how-to/quickstart)
- [Tailscale MagicDNS](https://tailscale.com/docs/features/magicdns)
- [Tailscale HTTPS certificates](https://tailscale.com/docs/how-to/set-up-https-certificates)
- [Tailscale Services](https://tailscale.com/docs/features/tailscale-services)
- [Docktail documentation](https://docktail.org/docs/)
