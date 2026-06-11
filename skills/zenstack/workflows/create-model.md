# Workflow: Create a model

1. Add model to ZModel.
2. Define primary key.
3. Add scalar fields.
4. Add relations.
5. Add validation attributes.
6. Add access policies.
7. Run:

```bash
npx zen generate
npx zen migrate dev
```

8. Update service/API code to use generated ORM client.
