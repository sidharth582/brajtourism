#!/usr/bin/env node
const semver = process.version.replace(/^v/, '');
const [major] = semver.split('.').map((n) => parseInt(n, 10));

if (Number.isNaN(major)) {
  console.error(`Unable to determine Node version from process.version='${process.version}'`);
  process.exit(1);
}

if (major < 20) {
  console.error(`\nNode ${major} detected. This project requires Node >= 20.\n`);
  console.error('Options to fix:');
  console.error('  - Use nvm: `nvm install 20 && nvm use 20`');
  console.error('  - Use Volta: `volta install node@20`');
  console.error('  - Install Node 20 from https://nodejs.org/ (or set your environment to use it)');
  process.exit(2);
}

// All good
process.exit(0);
