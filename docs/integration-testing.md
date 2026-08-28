# Live Minecraft integration test

This project is not considered server-tested until the bot emits `bot joined Minecraft server` after a real Mineflayer `spawn` event.

## Prerequisites

Use Node.js 20 or later on a machine that can resolve and reach the Minecraft server. The target server must be online and allow the configured authentication mode and bot account. Install dependencies from the checked-out repository with `npm install` (the previous incomplete lockfile was intentionally removed; npm will generate a valid lockfile).

## Required environment

Copy `.env.example` to `.env` and set:

```dotenv
MINECRAFT_HOST=OmegaXsan.aternos.me
MINECRAFT_PORT=24717
MINECRAFT_USERNAME=Gemini
OWNER_USERNAME=<your exact Minecraft username>
GEMINI_API_KEY=<only required for ordinary-English commands>
GEMINI_MODEL=gemini-2.5-flash
```

`GEMINI_API_KEY` is read only from the environment. Do not commit it. The bot does not send chat from usernames other than `OWNER_USERNAME` to Gemini.

## Commands

```bash
npm install
npm run build
npm test
npm start
```

After the spawn log appears, issue these commands from the configured owner account:

1. `!say integration chat works` — verifies inbound owner chat, registry dispatch, task execution, and outbound bot chat.
2. `!move <safe-x> <safe-y> <safe-z>` — verifies command parsing and Mineflayer Pathfinder `GoalBlock` navigation. Pick unobstructed coordinates near the bot.
3. `!stop` — clears the active pathfinder goal.
4. With `GEMINI_API_KEY` configured, send `please move to <safe-x> <safe-y> <safe-z>` — verifies the owner-only Gemini classification path. Confirm the model returns the `move` intent in logs/behavior.

Record the spawn log, received chat, bot response, movement result, and any `error`, `kicked`, or reconnect log entries. Do not treat a build-only test as evidence of a live integration.
