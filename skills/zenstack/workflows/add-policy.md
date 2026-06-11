# Workflow: Add access policy

1. Install and enable `@zenstackhq/plugin-policy`.
2. Define deny rules first for anonymous or blocked states.
3. Define allow rules for public reads, ownership, admin, or team membership.
4. Bind current user with `$setAuth(user)`.
5. Test as:
   - anonymous
   - owner
   - non-owner
   - admin
6. Avoid bypassing policies with raw SQL.
