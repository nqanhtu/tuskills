# ZenStack ORM Reference

Generate TypeScript artifacts:

```bash
npx zen generate
```

Create a client with a Kysely dialect/driver. ZenStack does not bundle database drivers.

## Query API

Common inputs:

- `where`
- `data`
- `select`
- `include`
- `omit`
- `orderBy`
- `take`
- `skip`

## Create

```ts
await db.user.create({
  data: {
    email: 'tu@example.com',
    posts: {
      create: [{ title: 'Hello' }]
    }
  },
  include: { posts: true }
});
```

Use:

- `create`
- `createMany`
- `createManyAndReturn`

## Find

```ts
await db.post.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' },
  take: 20
});
```

Use:

- `findMany`
- `findUnique`
- `findFirst`
- `findUniqueOrThrow`
- `findFirstOrThrow`
- `exists`

## Update

```ts
await db.post.update({
  where: { id },
  data: { title: 'New title' }
});
```

Use:

- `update`
- `updateMany`
- `updateManyAndReturn`
- `upsert`

Nested updates can create, connect, disconnect, update, and delete relations.

## Delete

```ts
await db.post.delete({ where: { id } });
await db.post.deleteMany({ where: { published: false } });
```

## Aggregate

```ts
await db.post.aggregate({
  where: { published: true },
  _count: { _all: true },
  _avg: { viewCount: true }
});
```

## Group by

```ts
await db.post.groupBy({
  by: ['authorId'],
  _count: { _all: true }
});
```

## Transactions

```ts
await db.$transaction([
  db.user.create({ data: { email } }),
  db.post.create({ data: { title } })
]);

await db.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { email } });
  return tx.post.create({ data: { title, authorId: user.id } });
});
```

## Query Builder

Use `db.$qb` for advanced type-safe SQL via Kysely.

## Raw SQL

Prefer query API or query builder. Raw SQL bypasses policies unless explicitly allowed.
