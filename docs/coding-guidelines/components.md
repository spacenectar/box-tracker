# Components

To ensure that code is as reusable as possible, this project uses React
components. Components should be named in a descriptive manner
( e.g. `notification-panel`) and should be written in PascalCase.

It is recommended that you use the [builda] command to create your component.

This will ask you to enter the name of your component and then create a new
component in the `./components` folder with all of the default files required.

If you are not using [builda] (which we strongly recommend that you do) then you
should structure your component as follows (`?` denotes optional files/folders):

(Example assumes component type is 'UI' and component name is 'side-navigation')

```asciidoc
root
└──components
    └──ui
      └──side-navigation
          ├──helpers (?)
          ├──images (?)
          ├──tests (?)
          ├──mocks (?)
          ├──side-navigation.stories.jsx
          ├──side-navigation.mdx(?)
          ├──index.tsx
          └──styles.module.scss (?)
```

You can also supply the component name as an argument:

<blockquote class="tip-wrapper">
  <strong class="note">Tip</strong>
  It is recommended you type the name of the component out in full as above
  builda will format the component and folder names for you.
</blockquote>

## Naming

The component file should be named `index.tsx` as this allows the component to
be referenced via the folder name only in imports (e.g.
`@components/progress-indicator` instead of `@components/progress-indicator/progress-indicator`).

## Component types

Components can be `atoms`, `molecules`, `organisms` or `partials`. For more
information about this, see the "Atomic design" section below.

## TypeScript

There should be no JavaScript inside a component, it should be [TypeScript]
only. TypeScript is set to `strict` mode and does not allow the use of `any`,
components that are not covered by type definitions will not be merged into the
project. You may find that the type definition that you need has already been
created, take a look in the `./lib/types` folder before you make new definitions.

## One component per folder

You should not nest components, if you want to make a smaller component inside
a larger component, then that should be a component in its own right.

An exception to this would be where you just want to separate out small
elements of the component into their own file for readability, for example:
If you were making a component with a list of items, you may want to make a small
component for for the `li` element. If this element made no sense to be used
elsewhere and is only reliant on props from it's direct parent then you could
create a new `components` folder in that component and put the the child-component
in there.

Those components do not need their own stories and tests, provided they are covered
by the parent component.

However, this should be done sparingly and only if the component is small and
is not reusable.

## Adding helper functions

Helper functions are used to help a component do something which isn't directly
related to the output of the component itself (void functions such as click
handlers, state setters, etc... are allowed to live in the tsx file).

All helper functions should reside in ./helpers and have one function per file
(if necessary, one class with multiple methods is also acceptable but if you use
that, you will be asked to justify its use in your Merge Request.)

## Adding Unit Tests

Snapshot tests are generated automatically using Storybook stories, so you do not
need to write any snapshot tests for your component. However, if there is any
special logic in your component, you should write a test to ensure that it
works as expected. This is still done via Storybook by adding 'interactions' to
the stories. See [Interaction tests](https://storybook.js.org/docs/7.0/react/writing-tests/interaction-testing)
for more information.

Every helper function (in `./helpers`) should also have its own spec file giving
as close to 100% coverage as it's possible to get.

Tests are written using [React Testing Library] and should be created in the
`./tests` folder of your component or in a file called `index.test.tsx` if you
are only writing one test file.

## Generating snapshots

To updated the generated snapshots, you can run `yarn test:unit -u` in
the project root. These snapshots will also be generated when running
`yarn preflight`.

## Adding stories

All components, no matter how small or large must have a [Storybook] entry, not
only does it allow you to view and develop the component in the Storybook UI,
but it also generates snapshot tests for each component.

Ideally, a component should be built in isolation and tested within Storybook
before being imported into the primary project, this ensures that the component
is robust and works by itself. It also provides a handy component library for
developers to be able to reuse components and prevent the reinvention of the
wheel.

Rather than document how to use [Storybook], please refer to the excellent
[Storybook Documentation]

When adding a story, please ensure you add a prefix to the title prop of the `Meta`
line (see 'meta line example' below) to ensure that it appears in the correct
Storybook group based on its type, this should be one of `atom`, `molecule` or
`organism`. Refer to The Atomic Design Principle section for guidance (see below).

Every story should also include a status, the status will appear as a badge
at the top of each story, as well as showing a colour-coded dot on the sidebar
when the story is expanded.

The available statuses are:

- **alpha** [pink] - Work in progress (subject to heavy change)
- **beta** [navy] - Work completed but not yet released (subject to minor change)
- **needs_revision** [orange] - Has been released but needs changes or fixes
- **stable** [green] - Released and stable
- **deprecated** [red] - Released but soon to be removed from codebase

This too should be added to the `Meta` line (see 'meta line example' below)

### Meta line example

e.g.

```jsx
<Meta
  title="molecule/InputContainer"
  component={InputContainer}
  parameters={{ status: { type: 'beta' } }}
/>
```

Each story should be named in a descriptive manner, although the first story may
be named `Default`. If it is the only story for that component then Default is
also an acceptable name.

<blockquote class="tip-wrapper">
  <strong class="note">Tip</strong>
  Stories are named after their PascalCased variables and will output
  as a regular sentence. e.g. `OverviewComplete` will be shown as
  `Overview Complete` in Storybook.
</blockquote>

Stories are required for all components, a Merge Request will not be approved
unless you show a working screenshot from that component's story.

### Storybook Playground

Our version of storybook has been configured to put documentation front-and-center
, at the top of the page, you should see a `Playground` tab, this is where you
can do some interesting things with the component.

At the bottom of the page, you should see a panel with various tabs, here is
what each tab can do (click the name of the tab to be taken to that tabs official
documentation):

- **[Controls]** - This tab allows you to control the component's props. Not everything
  can be controlled but you will be able to play around with the props to see how
  the component behaves and what it looks like.
- **[Actions]** - This tab captures the output of your interaction with the component.
  It can be really useful during development to see what is happening when you click
  or hover over a component amongst other things.
- **[Accessibility]** - This tab allows you to check the accessibility of your
  component. It looks for colour contrast and other accessibility issues.
- **[Performance]** - This tab allows you to run performance tests on your component.

<blockquote class="tip-wrapper">
  <strong class="note">Tip</strong>
  If no panel is showing press `a` to open the panel or click on the ellipsis
  icon at the top of the page and select `Show addons`
</blockquote>

## Updating the README

Each components MDX file starts with a `Meta` line, a title and a breif
description of the component. If you are using [builda] (strongly recommended
as it provides a well-structured MDX file out of the box) then you should
then you'll see a line which says `The description for the [Component Name] component`
This should be replaced with a description of the component that is relevant to
the component's purpose.

If your component has any special features or requirements which are not
made clear via the Stories themselves, you should add additional information
in the appropriate places. A good example of this is the [InputContainer](?path=/docs/molecule-inputcontainer--checkbox)
component, which has a lot of useful documentation.

## Using Mocks

Mock data should be used to populate the Story and Test data.

In a similar way to the custom types, it's worth checking to see if the mock
data you require is available in the `./lib/mocks` folder and if you are making
mock data that is likely to be reusable in other parts of the application,
please also consider adding it to that folder.

Do not add more data than is required as a) This will add bloat to the
[storybook] code preview and b) it will require you making an excessively
large custom type.

## Atomic Design

This project is based on the [Atomic Design Principle] by Brad Frost.

This means that components should be designed to be used in isolation,
and that each component should have a single purpose.

This is a very important principle to follow, as it will help you to
write code that is more maintainable, easier to read and easier to
understand.

The 5 main elements of the principle are:

- **Atoms** - Components that are small and simple, they should be used to
  represent a single piece of information. (e.g. `Button`)
- **Molecules** - Components that are built up from smaller components,
  they should be used to represent a single concept. (e.g. `InputContainer`)
- **Organisms** - Components that are a collection of molecules and atoms,
  they are used to show more complex ui elements. (e.g. `TableGenerator`)
- **Partials** - Components that are used to build up segments of a page,
  they should be used to represent a single piece of a page. (e.g. `AddCompanyForm`)
  whilst these are components, just like the others, they live in their own
  'partials' folder in the project root, it is acceptable to nest partials if
  it makes sense to do so. It is also acceptable to not write stories for
  nested partials, provided that the top level component has a story which documents
  them.
- **Templates** - Components that are used to show page layouts. (e.g. `Layout`)
- **Pages** - Pages are the main components of the application, they should
  be used to show the user a single page of the application. (e.g. the `Home` page)

_Atoms_ should have no dependencies on other components, or any
aware of the state of the application. They may have their own, internal
state but they should only have data and logic that is relevant to them.

_Molecules_ and _organisms_ may have dependencies on other components, but they
should still not have any awareness of the state of the application.

Data should be passed to and from atoms, molecules and organisms via props.

_Partials_ may have dependencies on other components and may have awareness
of the state of the application if required.

However this should still be kept to a minimum and only sent data that is
relevant to the component via props. However more application specific props
such as redux functions can be used at this level. At this level,
static data may be loaded directly into the component.

In a nutshell, the main difference between a partial and an organism is reusability
outside of this project. If an organism is strongly tied to this particular
project then it's probably something that should be converted into a partial.

Pages and templates are the main components of the application and
are not designed to be used in isolation. They do not require stories and
reside in their own `pages` and `templates` folders in the project root.

Data can be passed to and from pages and templates via any appropriate means
required.

<blockquote class="tip-wrapper">
  <strong class="note">Tip</strong>
  `yarn builda` generates components in the root of the `components` folder,
  however you can easily add an `--output` flag to generate components in their
  correct folders. There are some scripts in the `package.json` file to help
  you do this. (you will still have to change the path manually in the story meta
  data though.)
</blockquote>

### Other things to consider when making a new component

- Components should be pure functions and not use a class.
- Components should be written in a way that they are easily reusable.
- Components should be written in a way that they are easy to test.
- Components should be written in a way that they are easy to read.
- Components should not just be wrappers around third party components (e.g.
  `material-ui`).

[Next: StyleSheets](./stylesheets.md)

[builda]: https://www.npmjs.com/package/builda 'builda'
[typescript]: https://www.typescriptlang.org 'TypeScript'
[react testing library]: https://testing-library.com/docs/react-testing-library/intro 'React Testing Library'
[storybook]: https://storybook.js.org/ 'Storybook'
[storybook documentation]: https://storybook.js.org/docs/react/get-started/introduction 'Storybook Documentation'
[atomic design principle]: https://bradfrost.com/blog/post/atomic-web-design/ 'Atomic Design Principle'
[controls]: https://storybook.js.org/docs/react/essentials/controls 'Controls'
[actions]: https://storybook.js.org/docs/react/essentials/actions 'Actions'
[accessibility]: https://storybook.js.org/addons/@storybook/addon-a11y/ 'Accessibility'
[performance]: https://storybook.js.org/addons/storybook-addon-performance/ 'Performance'
