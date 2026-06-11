# ZenStack Utilities Reference

## Zod

ZenStack can derive Zod schemas from ZModel.

Use cases:

- API input validation
- form validation
- runtime checking
- validating payloads before calling ORM

## Studio

Run:

```bash
npx zenstack studio
```

Studio helps inspect, edit, and query your database with schema awareness.

## Logging

Configure logs when creating `ZenStackClient`:

```ts
const db = new ZenStackClient(schema, {
  ...options,
  log: ['query', 'error']
});
```

## Errors

Catch `ORMError` and inspect `reason`.

Common reasons:

- `INVALID_INPUT`
- `NOT_FOUND`
- `REJECTED_BY_POLICY`
- `DB_QUERY_ERROR`
