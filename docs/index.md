# Jackanory - The Arch Co Edition

This repository contains the guidelines for building applications using the Jackanory
boilerplate codebase.

It is a living document and will be updated as and when new guidelines are agreed.

## Storybook

All Jackanory applications are documented with [Storybook](https://storybook.js.org/).
Storybook helps you build UI components and pages in isolation from your
app's business logic, data, and context.

That makes it easy to develop hard-to-reach states. Save these UI states as **stories**
to revisit during development, testing, or QA.

We recommend building UIs with a [**component-driven**](https://componentdriven.org)
process starting with atomic components and ending with organisms.

## Devkit

All Jackanory applications have access to the Devkit. This is a terminal command
that significantly improves the developer experience.

When you run `yarn devkit` in the root of your application. The following actions
will be performed:

- The application will run `yarn install` to ensure all dependencies are up to date
- The application will start a 'multiplexer' process that will run the following
  commands in parallel:
  - `yarn storybook` - This will start the storybook server
  - `yarn next` - This will start the Next dev server
  - `yarn watch` - This will start the watch processes for the application

It will also create a `zsh` shell that will allow you to run any commands you need
to run.

The panel manager uses the [blessed](https://www.npmjs.com/package/blessed) and
[blessed-xterm](https://www.npmjs.com/package/blessed-xterm) packages.
For more information, please see their respective documentation.

## Using the Devkit

**NOTE:** Ignore anything that referrs to the devkit for now. The script doesn't exist yet

Once you have run `yarn devkit` in the root of your application, you will be
presented with a `zsh` shell. This shell will allow you to run any commands you
need to run.

If you need to switch to a different panel, you can do so by simply clicking
on the panel you want to switch to.

To exit the devkit, you can press `ctrl + q` if you want to restart a specific
panel, click the panel you want to restart and then press `ctrl + r`.
(Note: it is ctrl on both windows and mac)

## Known Issues with the Devkit

- It is recommended to ensure your terminal window is at a fairly large size
  before running the devkit as when you resize the window after running the devkit,
  the panels will not resize.
- Opening a link from within the devkit will result in `|` characters being injected
  into the URL at any point where the text is wrapped.
- Pressing 'up' to access previous commands after scrolling inside a panel will do
  nothing. However this can be worked around by simply hitting enter before pressing
  up to return to the caret position.
- Exiting the devkit will cause errors to display in the terminal. These can be
  ignored and the terminal can be closed as normal.

### Devkit Requirements

In order to be able to use the Devkit, you will need to meet the following requirements:

- You will need to have `zsh` installed on your machine (this is the default shell
  on Mac OS - if you are using a different OS, you will need to install this using
  the preferred method for your OS)
- (WINDOWS ONLY) You will need to install the `windows-build-tools` package globally
  on your machine. This can be done by running `yarn global add windows-build-tools`
  in an elevated terminal.
- (MAC ONLY) You will need to install the `Command Line Tools` on your machine.
  This can be done by running `xcode-select --install` in a terminal (this is a
  common requirement for many node packages, so you may already have this installed).
- You will need to have `yarn` installed on your machine. This can be done by
  running `npm install -g yarn` in a terminal.
- (WSL ONLY) You will need to have `build-essentials`, `make` and `python` installed
  on your machine. This can be done by running `sudo apt-get install -y python make build-essential` in a terminal.

## Watchers

Some parts of a jackanory application require the generations of specific files.
Whilst manually running these generators is possible via the `yarn gen:[x]` commands,
it is recommended that you use the `yarn watch` command to automatically run these
generators automatically when the source files change.

## Browser Support

All Suite applications support the latest versions of all major current desktop
and mobile browsers.

Our current 'browserlist' compatibility is the following:

```yaml
last 2 versions
maintained node versions
not dead
unreleased versions
```

## Getting help

For additional support, please raise an issue on the [Jackanory GitHub repository](https://github.com/foxleigh81/jackanory/issues).
