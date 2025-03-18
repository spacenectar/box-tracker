
![Box Tracker Logo](/libs/assets/branding/box-tracker-logo-square.png)
# Jackanory - The Box Tracker edition

This repository contains the guidelines for building applications using the Jackanory
boilerplate codebase.

It is a living document and will be updated as and when new guidelines are agreed.

## Development Setup

- [NX Monorepo](./development-setup/nx.md) - Guide to the NX monorepo structure and commands
- [Docker Setup](./development-setup/docker.md) - Instructions for using Docker with Box Tracker
- [DevKit](./development-setup/devkit.md) - Guide to using the DevKit tmux development environment

## Storybook

All Jackanory applications are documented with [Storybook](https://storybook.js.org/).
Storybook helps you build UI components and pages in isolation from your
app's business logic, data, and context.

That makes it easy to develop hard-to-reach states. Save these UI states as **stories**
to revisit during development, testing, or QA.

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
