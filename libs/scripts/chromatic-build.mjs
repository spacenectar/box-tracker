#!/usr/bin/env node

// This script handles building Storybook for Chromatic in an NX monorepo
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get output directory from Chromatic arguments
const args = process.argv.slice(2);
let outputDir = 'dist/storybook/storybook-host';

// Parse arguments to find output-dir
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--output-dir=')) {
    outputDir = args[i].split('=')[1];
    break;
  }
}

console.log(`Building Storybook to ${outputDir}...`);

try {
  // Build Storybook using NX
  execSync(`nx build storybook-host --output-dir=${outputDir}`, {
    stdio: 'inherit',
  });
  
  console.log('Storybook build completed successfully');
} catch (error) {
  console.error('Error building Storybook:', error);
  process.exit(1);
}
