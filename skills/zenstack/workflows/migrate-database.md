# Workflow: Migrate database

Development:

```bash
npx zen generate
npx zen migrate dev
```

Production:

```bash
npx zen migrate deploy
```

Checklist:

- Review generated SQL.
- Back up production database.
- Never run reset in production.
- Keep migrations committed.
