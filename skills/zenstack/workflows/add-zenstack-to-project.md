# Workflow: Add ZenStack to a project

1. Install packages.

```bash
npm install @zenstackhq/orm @zenstackhq/cli
```

2. Add database driver.

PostgreSQL:

```bash
npm install pg
npm install -D @types/pg
```

3. Create schema.

```txt
zenstack/schema.zmodel
```

4. Generate client.

```bash
npx zen generate
```

5. Create db client factory.

6. Add policy plugin if needed.

7. Run migration.

```bash
npx zen migrate dev
```
