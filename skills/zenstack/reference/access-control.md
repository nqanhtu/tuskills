# ZenStack Access Control Reference

Access control is modeled in ZModel and enforced by the policy plugin.

## Enable policy plugin

```bash
npm install @zenstackhq/plugin-policy
```

```zmodel
plugin policy {
  provider = '@zenstackhq/plugin-policy'
}
```

## Policy rules

Use:

- `@@allow(operation, condition)`
- `@@deny(operation, condition)`

Operations:

- `create`
- `read`
- `update`
- `delete`
- `post-update`
- `all`

Rules:

1. Any matching deny wins.
2. Else any matching allow grants access.
3. Else denied by default.

## Example

```zmodel
model Post {
  id        String  @id @default(cuid())
  title     String
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  String

  @@deny('all', auth() == null)
  @@allow('read', published)
  @@allow('all', auth().id == authorId)
}
```

## Runtime

```ts
import { PolicyPlugin } from '@zenstackhq/plugin-policy';

const rawDb = new ZenStackClient(schema, options);
const authDb = rawDb.$use(new PolicyPlugin());

const userDb = authDb.$setAuth({
  id: session.user.id,
  role: session.user.role
});
```

Use request-scoped clients. Anonymous mode happens when `auth()` is `null`.

## Important behavior

- Read policies transparently filter rows.
- Single-record update/delete can throw `NOT_FOUND` if the row is not allowed.
- Mutation can succeed but fail read-back if read policy blocks the returned result.
