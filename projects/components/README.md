# Components

This is a project to store the component library for components that are shared
between box-tracker projects.

## How to use

You can import components from the package by using the components name in the
import.

e.g.

```
import Masthead from `@components/masthead`
```

## Storybook

This project has it's own storybook which can be ran via `yarn dev`. However it's
limited to only the components within this project.

It is recommended to run the `storybook` command from within the project you are
working on. e.g. `nx run webapp:storybook`.

To prevent conflicts, each project has storybook running on it's own port. This
project runs storybook on port 6005.


### Dependence on the 'Webapp' project

As all of the storybook components are built to be used within NextJS and use
various next packages (`next/image`, `next/font`, `next/link` etc...) I've added
the webapp project as a base. This means it is using that projects next.config.js
as well as using the main `layout.tsx` file as a global wrapper.
