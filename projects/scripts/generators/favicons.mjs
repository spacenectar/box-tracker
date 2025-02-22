#! /usr/bin/env node

import { favicons } from 'favicons';
import { writeFileSync, readFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { resolve, dirname, join } from 'path';
import chokidar from 'chokidar';

const __dirname = dirname(resolve('./package.json'));
const source = resolve(__dirname, 'public/icons/app-logo.svg'); // Source image(s). `string`, `buffer` or array of `string`
const dest = resolve(__dirname, 'public/favicons'); // Destination for the generated favicons. `string`
const packageJson = readFileSync('package.json', 'utf8');
const appInfo = JSON.parse(packageJson);

const configuration = {
  path: '/favicons', // Path for overriding default icons  `string`
  appName: appInfo.name,
  appDescription: appInfo.description, // Your application's description. `string`
  background: '#fff', // Background colour for flattened icons. `string`
  theme_color: '#24508f', // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  version: appInfo.version, // Your application's version string. `string`
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  icons: {
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
    favicons: true, // Create favicon images. `boolean` or `{ offset, background }` or an array of sources
    windows: true, // Create Windows images. `boolean` or `{ offset, background }` or an array of sources
    yandex: false // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
  }
};

const runGenerator = async () => {
  if (existsSync(dest)) {
    // If the dest dir exists, delete all files in it so we can start fresh
    rmSync(dest, { force: true, recursive: true });
  }
  mkdirSync(dest);

  const response = await favicons(source, configuration);

  response.images.forEach((image) =>
    writeFileSync(join(dest, image.name), image.contents)
  );

  response.files.forEach((file) =>
    writeFileSync(join(dest, file.name), file.contents)
  );

  writeFileSync(join(dest, 'favicons.html'), response.html.join('\n'));
};

(function () {
  // Run the generator once to start with
  runGenerator();
  // If the script is called with '--watch' or '-w'. Watch for changes to the docs folder and re-run the script
  if (process.argv.includes('--watch') || process.argv.includes('-w')) {
    chokidar
      .watch(resolve(source), {
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true
      })
      .on('ready', () => {
        console.log('Watching AppLogo file for changes...');
      })
      .on('all', (event, path) => {
        console.log(event, path);
        runGenerator();
      });
  }
})();
