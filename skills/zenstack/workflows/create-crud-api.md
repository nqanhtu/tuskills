# Workflow: Create CRUD API

1. Model entities in ZModel.
2. Add policies.
3. Generate client.
4. Choose API style:
   - RPC for ORM-like operations
   - REST for JSON:API / OpenAPI
5. Use a server adapter for the framework.
6. In each request, bind auth context with `$setAuth`.
7. Generate/use client SDK where possible.
