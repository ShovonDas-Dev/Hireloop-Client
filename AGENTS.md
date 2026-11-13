<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop client

Next.js 16 + React 19 app with shadcn/ui (style `base-nova`), Tailwind v4 (CSS-based config in `app/globals.css`), and Better Auth on MongoDB.

## Commands

```bash
npm run dev        # next dev
npm run lint       # eslint (flat config)
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write
npm run build      # next build
```

- No test runner exists. Verify changes with `npm run lint` + `npm run typecheck`, then `npm run build` for route/type errors that only surface at build time.

## Structure

- No `src/` — code lives at the repo root. The `@/*` alias maps to the repo root (e.g. `@/components`, `@/lib`).
- shadcn components go in `components/ui` via `npx shadcn@latest add <name>`; do not hand-write new ones when the registry has them.
- Prettier enforces: no semicolons, double quotes, LF line endings, and sorts Tailwind classes (`cn`/`cva` are class-list functions).

## Auth (Better Auth + MongoDB)

- Server: `lib/auth.ts` — `mongodbAdapter` on db `hireloop`; requires `MONGODB_URI`.
- Client: `lib/auth-client.ts`; handler: `app/api/auth/[...all]/route.js` (note: `.js`, not `.tsx`).
- `lib/auth-client.ts` currently creates two clients and exports `signIn`/`signUp`/`useSession` from the one **without** `baseURL`; the `baseURL` client is unused (its `baseURL` is a literal string, not an interpolation). Don't "fix" this opportunistically — flag it to the user instead.

## Environment

- `.env` is local-only (gitignored). It must contain `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. Without it, `lib/auth.ts` crashes at import.
- `CLAUDE.md` is just `@AGENTS.md` — edit this file, not that one.
