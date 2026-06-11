# ZenStack Skill

Use this skill when working with ZenStack v3 in TypeScript, Node.js, Bun, Elysia, Hono, Next.js, or backend projects.

## What this skill covers

- ZModel schema modeling
- Relations, custom types, mixins, JSON, views, polymorphism
- ZenStack ORM client setup and query API
- Access control policies with `@zenstackhq/plugin-policy`
- Query-as-a-Service, RPC/REST API handlers, adapters, and client SDKs
- Migrations and database workflows
- Zod utilities and ZenStack Studio
- Common workflows for adding models, CRUD APIs, policies, and migrations

## Golden rules

1. Treat ZModel as the source of truth for data, relations, validation, access control, and derived APIs.
2. Do not write authorization rules only in route handlers when they can live in ZenStack policies.
3. Use `.agents/skills/zenstack/reference/*` before changing schema, ORM, or policies.
4. Run `zen generate` after changing ZModel.
5. Use `zen migrate dev` for development migrations and `zen migrate deploy` for production.
6. Use `$setAuth(user)` with the policy plugin for request-scoped authorization.
7. Use Query Builder API or raw SQL only when the regular ORM query API is not enough.
8. Avoid raw SQL in policy-protected code unless there is a strong reason and it is reviewed.

## Reference map

- `reference/schema.md` — ZModel modeling
- `reference/orm.md` — ORM client and queries
- `reference/access-control.md` — policies and auth context
- `reference/query-service.md` — auto CRUD APIs
- `reference/migrations.md` — database workflows
- `reference/utilities.md` — Zod and Studio

## Workflows

- `workflows/add-zenstack-to-project.md`
- `workflows/create-model.md`
- `workflows/add-policy.md`
- `workflows/create-crud-api.md`
- `workflows/migrate-database.md`

## Examples

- `examples/socialpilot-like-app.md`
