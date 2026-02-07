#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ASSETS_DIR = path.resolve(process.cwd(), 'build', 'client', 'assets');

function findFile(files, re) {
  return files.find((f) => re.test(f));
}

async function main() {
  try {
    const stat = await fs.stat(ASSETS_DIR).catch(() => null);
    if (!stat || !stat.isDirectory()) {
      console.error(`Build assets directory not found: ${ASSETS_DIR}`);
      process.exit(1);
    }

    const files = await fs.readdir(ASSETS_DIR);

    // patterns used by the build
    const manifestFile = findFile(files, /^manifest(-.*)?\.js$/);
    const entryFile = findFile(files, /^entry\.client-.*\.js$/);

    if (!manifestFile) {
      console.error('Could not find manifest-*.js in', ASSETS_DIR);
      process.exit(2);
    }
    if (!entryFile) {
      console.error('Could not find entry.client-*.js in', ASSETS_DIR);
      process.exit(3);
    }

    const manifestSrc = path.join(ASSETS_DIR, manifestFile);
    const entrySrc = path.join(ASSETS_DIR, entryFile);
    const manifestDest = path.join(ASSETS_DIR, 'manifest.current.js');
    const entryDest = path.join(ASSETS_DIR, 'entry.client.current.js');

    await fs.copyFile(manifestSrc, manifestDest);
    await fs.copyFile(entrySrc, entryDest);

    console.log('Copied:');
    console.log('  %s -> %s', manifestFile, path.basename(manifestDest));
    console.log('  %s -> %s', entryFile, path.basename(entryDest));
    // Also copy public/index.html into the client build folder so static hosts
    // like Netlify will serve the correct bootstrap HTML from the publish dir.
    const publicIndex = path.resolve(process.cwd(), 'public', 'index.html');
    const clientIndex = path.resolve(process.cwd(), 'build', 'client', 'index.html');
    await fs.copyFile(publicIndex, clientIndex).catch((err) => {
      console.warn('Warning: could not copy public/index.html to build/client/index.html:', err && err.code);
    });
  } catch (err) {
    console.error('Error while copying stable assets:', err);
    process.exit(10);
  }
}

main();
