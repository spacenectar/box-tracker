# General Coding Guidelines

This section is just general good practice, regardless of language used.

## Coding style

- Use spaces for tabs
- Use 2 space widths per tab indentation
- Trim all trailing whitespace
- Use semicolons where appropriate
- Do not exceed 80 characters per line

> **Note:** For the simplest development process, please ensure your development
> environment confirms to the projects `.editorconfig` file. There are plugins for
> most (if not all) popular editors, find yours [here][1] or install the
> [Prettier][2] plugin for your editor.

## Code comments

Code comments should be written in a formal, imperative style and describe the
code or the intended outcome. Please avoid the use of colloquialisms and use the
present tense.

### Acceptable

```js
// Confirms user has been found
```

### Unacceptable

```js
// Cool, we have a user
```

## Function commenting (JSDoc)

When describing a function or a method, please use the [jsdoc][3] standard for
functions.

### Acceptable

```js
/**
 * Foo() returns a string
 *
 * @param {string} n - A string param
 *
 */

const foo = (n: string): string => n;
```

### Unacceptable

```js
// Returns n
const foo = (n: string): string => n;
```

## Stay DRY and remember to KISS

DRY stands for 'Don't Repeat Yourself' and is a great way of keeping your code
terse and reusable. Where possible, you should break your code down into
functions to avoid the use of repeated code. The smaller the function the better
as a function should only have one job.

Remember, DRY code, doesn't always mean less code, sometimes we have to write a
little bit more code to make something more reusable, this is acceptable as more
code now means less code later. However, efforts should always be made to keep
the code as terse as possible. This is where KISS comes in.

KISS stands for 'Keep It Simple, Stupid.' Which is a slightly mean way of
saying, don't overcomplicate your code and consider its readability and
simplicity when you write it.

<blockquote class="tip-wrapper">
  <strong class="note">Tip</strong>
  For examples, refer to [this great article by Arvind Singh Baghel][4],
  it's not related to JavaScript but the principles are transferrable and it
  includes a few great examples.
</blockquote>

## Consider YAGNI

YAGNI ('You Ain't Gonna Need It') is a common phrase used to describe code that
is not needed for the current project. This is a great way to reduce the amount
of code you write and to avoid having to review and update it later. Whenever
you create something for the project, you should consider if it is definitely
needed and if YAGNI, then don't make it.

## Naming conventions and Casing

Please adhere to the following naming conventions.

- All filenames should be written in kebab-case
- All function/method names should be written in camelCase
- All Component and Class names should be written in PascalCase
- Stylesheet classes, id's and variables should all be written in kebab-case
- Components should be named in a descriptive manner (e.g. `notification-panel`)
- Images should be named in a descriptive manner (e.g. `man-using-fishing-rod.jpg`)
- Functions/methods should be named in a descriptive manner (e.g. `getClassNames()`)
- Style classes should be written in a descriptive manner (e.g. `.progress-bar`)

Beware of case matching gotchas, as it can lead to confusion and bugs. For example,
if you name your component folder `input-datetime` but then call your component
`InputDateTime` in your code, you will end up with bugs if you try to import
it directly from the `@components` alias it will not work, as it will be added to
the `@components` index registry as `InputDatetime` (note the lower case 't').

[Next: JavaScript](./javascript.md)

[1]: https://editorconfig.org/#download
[2]: https://prettier.io/
[3]: https://devhints.io/jsdoc
[4]: https://dzone.com/articles/software-design-principles-dry-and-kiss
