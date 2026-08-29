# Papa-Minecraft-AI

A TypeScript, Mineflayer-based Minecraft assistant with a safety-first cognitive loop and optional Gemini planning.

## Setup

1. Install Node.js 20 or newer and run `npm install`.
2. Copy `.env.example` to `.env`, set `MINECRAFT_HOST`, `MINECRAFT_PORT`, `MINECRAFT_USERNAME`, `OWNER_USERNAME`, and optionally `GEMINI_API_KEY`.
3. Run `npm run build`, then `npm start`.

The bot logs connection failures and uses exponential reconnect backoff; it is safe to start before the server is available. Owner chat commands beginning with `!` are deterministic (for example `!move 10 64 -3`); ordinary owner English is classified through Gemini and must have a configured `GEMINI_API_KEY`. The REST scaffolding exposes health, status, task, and memory endpoints when embedded in an HTTP server.

## Live-server smoke test

On a machine with network access, set `MINECRAFT_HOST=OmegaXsan.aternos.me`, `MINECRAFT_PORT=24717`, `MINECRAFT_USERNAME=Gemini`, and an `OWNER_USERNAME`, then run `npm install && npm run build && npm start`. This generates a complete lockfile from the declared dependency graph. Wait for the `bot joined Minecraft server` log. From the configured owner account, send `!say integration chat works`, then `!move <safe-x> <safe-y> <safe-z>`, and verify the bot chat response and movement. To exercise Gemini routing, set `GEMINI_API_KEY` and send the same move request in ordinary English. Stop it with `!stop`.
