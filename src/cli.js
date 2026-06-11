import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const INSTALL_ROOT = path.join(process.cwd(), '.agents', 'skills');

function exists(p) {
  return fs.existsSync(p);
}

function copyDir(src, dest) {
  if (!exists(src)) {
    throw new Error(`Skill source not found: ${src}`);
  }
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(from, to);
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
    }
  }
}

function removeDir(target) {
  if (!exists(target)) return false;
  fs.rmSync(target, { recursive: true, force: true });
  return true;
}

function listAvailable() {
  if (!exists(SKILLS_DIR)) return [];
  return fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function listInstalled() {
  if (!exists(INSTALL_ROOT)) return [];
  return fs.readdirSync(INSTALL_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function printHelp() {
  console.log(`tuskills - Personal AI agent skills registry

Usage:
  tuskills add <skill...>       Install one or more skills into .agents/skills
  tuskills remove <skill...>    Remove one or more installed skills
  tuskills list                 List skills available in this registry
  tuskills installed            List installed skills in current project
  tuskills update <skill...>    Reinstall selected skills
  tuskills sync                 Suggest skills based on package.json
  tuskills help                 Show this help

Examples:
  npx tuskills add zenstack
  npx github:nqanhtu/tuskills add zenstack
  npx tuskills remove zenstack
`);
}

function addSkills(names) {
  if (!names.length) throw new Error('Missing skill name. Example: tuskills add zenstack');

  const available = new Set(listAvailable());
  for (const name of names) {
    if (!available.has(name)) {
      throw new Error(`Unknown skill "${name}". Available: ${[...available].join(', ') || '(none)'}`);
    }

    const src = path.join(SKILLS_DIR, name);
    const dest = path.join(INSTALL_ROOT, name);
    removeDir(dest);
    copyDir(src, dest);
    console.log(`Installed ${name} -> ${path.relative(process.cwd(), dest)}`);
  }
}

function removeSkills(names) {
  if (!names.length) throw new Error('Missing skill name. Example: tuskills remove zenstack');

  for (const name of names) {
    const dest = path.join(INSTALL_ROOT, name);
    if (removeDir(dest)) {
      console.log(`Removed ${name}`);
    } else {
      console.log(`Not installed: ${name}`);
    }
  }
}

function syncSkills() {
  const pkgPath = path.join(process.cwd(), 'package.json');
  if (!exists(pkgPath)) {
    console.log('No package.json found. Nothing to sync.');
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
    ...pkg.optionalDependencies,
  };

  const suggestions = [];
  const names = Object.keys(deps || {});
  if (names.some((name) => name.startsWith('@zenstackhq/') || name === 'zenstack')) {
    suggestions.push('zenstack');
  }

  if (!suggestions.length) {
    console.log('No matching skills detected from package.json.');
    return;
  }

  console.log(`Suggested skills: ${suggestions.join(', ')}`);
  console.log(`Install with: tuskills add ${suggestions.join(' ')}`);
}

export async function main(args) {
  const [command, ...rest] = args;

  switch (command) {
    case undefined:
    case 'help':
    case '--help':
    case '-h':
      printHelp();
      break;

    case 'add':
    case 'install':
      addSkills(rest);
      break;

    case 'remove':
    case 'rm':
    case 'uninstall':
      removeSkills(rest);
      break;

    case 'list':
    case 'ls':
      console.log(listAvailable().join('\n') || 'No skills available.');
      break;

    case 'installed':
      console.log(listInstalled().join('\n') || 'No skills installed in this project.');
      break;

    case 'update':
      removeSkills(rest);
      addSkills(rest);
      break;

    case 'sync':
      syncSkills();
      break;

    default:
      throw new Error(`Unknown command: ${command}. Run "tuskills help".`);
  }
}
