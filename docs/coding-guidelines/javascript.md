# JavaScript/TypeScript/React Guidelines

This section applies only to JavaScript, [TypeScript] and [React]

## Coding style

All of our JavaScript is written in ES6 and [TypeScript].

We use [Prettier] to format our code and [ESLint] to enforce our coding style,
so developers can write code using their preferred writing style and can be
assured that it will be formatted correctly.

We recommend enabling the 'format-on-save' feature on your editor to make this
process smooth, however, our git hooks will also automatically format your code
before committing, you can also run yarn preflight to test and format your code
at any time.

There are a few notable exceptions: Storybook does not use [TypeScript] (opting
instead for the MDX file format) and some config files for 3rd party tools do not
use TypeScript or ES6.

## ES6

To maintain consistency across the project, please ensure you are using ES6
conventions, for example, use template literals instead of string concatenation:

### Acceptable

```js
`I am a string with a ${variable} in it`;
```

### Unacceptable

```js
'I am a string with a' + variable + 'in it';
```

## Use object destructuring wherever possible

Object destructuring is a great way to keep code clean and DRY and should be
used wherever possible.

### Acceptable

```js
import {
  helperOne,
  helperTwo,
  helperThree,
  helperFour,
  helperFive
} from './helpers';
```

### Unacceptable

```js
import helperOne from './helpers';
import helperTwo from './helpers';
import helperThree from './helpers';
import helperFour from './helpers';
import helperFive from './helpers';
```

## Type checking

There is little point in repeating the already excellent work done by the
Microsoft team, so here is a link to their docs:
https://www.typescriptlang.org/docs/home.html or if you want a great
introduction to the basics, refer to this excellent youtube video:

https://www.youtube.com/watch?v=ahCwqrYpIuM

<blockquote class="tip-wrapper">
  <strong class="warning">Note:</strong>
  Some files in the project root and in the `config` folder have to
  remain as js files as they are technically outside of the project scope
</blockquote>

[Next: Components](./components.md)

[react]: https://reactjs.org/ 'React'
[prettier]: https://prettier.io/ 'Prettier'
[eslint]: https://eslint.org/ 'ESLint'
[typescript]: https://www.typescriptlang.org 'TypeScript'
