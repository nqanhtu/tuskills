# ZenStack Schema Reference

ZenStack uses ZModel as the schema language. It is similar to Prisma schema but extends it with access control, validation, plugins, strongly typed JSON, mixins, views, polymorphism, and custom procedures.

## Datasource

```zmodel
datasource db {
  provider = 'postgresql'
  url      = env('DATABASE_URL')
}
```

Use one datasource per schema. The datasource is mainly for generation and migration. Runtime database connection is passed when creating the ORM client.

## Models

```zmodel
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Relations

```zmodel
model Post {
  id       String @id @default(cuid())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
}
```

Patterns:

- One-to-one: one side owns a unique foreign key.
- One-to-many: child owns foreign key, parent has array.
- Many-to-many: use implicit arrays or explicit join model.

## Enums

```zmodel
enum Role {
  USER
  ADMIN
}
```

## Custom types

Use `type` for reusable embedded shapes.

```zmodel
type Address {
  city    String
  country String
}
```

## Strongly typed JSON

```zmodel
type SocialProfile {
  provider String
  handle   String
}

model Account {
  id      String        @id @default(cuid())
  profile SocialProfile @json
}
```

## Mixins

```zmodel
type Timestamps {
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post with Timestamps {
  id    String @id @default(cuid())
  title String
}
```

## Multi-file schema

Split large schemas:

```zmodel
import './user'
import './post'
```

## Views

Use `view` for database views. Create SQL view manually or via migration edits.

## Polymorphism

Use base models with `@@delegate`.

```zmodel
model Content {
  id   String @id @default(cuid())
  type String
  name String

  @@delegate(type)
}

model Post extends Content {
  body String
}
```

## Plugins

```zmodel
plugin policy {
  provider = '@zenstackhq/plugin-policy'
}
```
