# tuskills

Personal AI engineering skills registry.

`tuskills` installs reusable AI-agent skills into your project under:

```txt
.agents/skills/<skill-name>
```

## Quick usage

From a project where you want to install a skill:

```bash
npx github:nqanhtu/tuskills add zenstack
```

After publishing to npm, you can use:

```bash
npx tuskills add zenstack
```

The installed skill will be copied to:

```txt
.agents/skills/zenstack
```

## Commands

```bash
npx tuskills add zenstack
npx tuskills remove zenstack
npx tuskills list
npx tuskills installed
npx tuskills update zenstack
npx tuskills sync
```

## Current skills

- `zenstack` — ZenStack v3 schema modeling, ORM, access control, Query-as-a-Service, migrations, utilities, and workflows.

## Skill structure

```txt
skills/<skill-name>/
  SKILL.md
  reference/
  workflows/
  examples/
```

## Development

```bash
node ./bin/tuskills.js list
node ./bin/tuskills.js add zenstack
```

## Publish to npm

```bash
npm login
npm publish --access public
```

If `tuskills` is already taken on npm, rename the package to your scope:

```json
{
  "name": "@nqanhtu/tuskills"
}
```

Then use:

```bash
npx @nqanhtu/tuskills add zenstack
```
