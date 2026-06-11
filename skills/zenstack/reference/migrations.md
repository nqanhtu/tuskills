# ZenStack Migration Reference

ZenStack migration commands wrap Prisma Migrate after generating Prisma schema from ZModel.

## Development

```bash
npx zen generate
npx zen db push
npx zen migrate dev
```

Use `db push` for fast local experiments. Use `migrate dev` when you want committed migration files.

## Production

```bash
npx zen migrate deploy
```

Do not use `db push` or `migrate dev` in production.

## Reset

```bash
npx zen migrate reset
```

Development only. It drops and recreates data.

## Status

```bash
npx zen migrate status
```

## Existing database

```bash
npx zen db pull
npx zen generate
```

Review generated schema before committing.
