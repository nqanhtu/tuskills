# Query-as-a-Service Reference

ZenStack can expose CRUD APIs derived from ZModel.

## Concepts

- API Handler: framework-agnostic request translator.
- Server Adapter: framework integration.
- Client SDK: generated typed client/hooks.

## RPC style

RPC endpoints mirror ORM operations:

```txt
POST /api/model/post/create
GET  /api/model/post/findMany?q=...
```

Use RPC when your frontend wants ORM-like calls.

## REST style

RESTful handler follows JSON:API conventions.

Use REST when you want resource-oriented endpoints and OpenAPI docs.

## Server adapters

ZenStack has adapters for popular frameworks, including Express, Hono, Elysia, Next.js, Nuxt, SvelteKit, and others.

Request pattern:

1. Read auth/session from request.
2. Build a policy-enabled db client.
3. Pass it to the handler.

## Client SDKs

Use generated clients/hooks when possible to keep frontend calls type-safe.
