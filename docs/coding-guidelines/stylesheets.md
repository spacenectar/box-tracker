# Stylesheets

This section applies only to CSS/SCSS. [Sass] is our preprocessor of choice, and
we use React's '[css-modules]' to ensure that the styles are scoped to their
component. This allows us to use generic-looking classes in components without
worrying about conflicts.

## Coding Style

As we are using styles which are scoped to the component and each component
should have a single task, [BEM notation] will not be required or used in any
stylesheets.

If you require the use of a modifier, the `--modifier` syntax is still acceptable.

### Acceptable

```css
.button {
  padding: $spacing;
  text-align: centre;
  background-color: #f00;
  color: #333;
  &--disabled {
    background-color: #ccc;
  }
}
```

### Unacceptable

```css
.contact_form {
  &__button {
    padding: $spacing;
    text-align: centre;
    background-color: #f00;
    color: #333;
    &--disabled {
      background-color: #ccc;
    }
  }
}
```

In the example above, contact_form and button should be two components and
therefore each has its own scoped styles.

## Page styles

As a page is also a component, we should use the same style syntax as components.
Styles for pages should live in the `pages` folder and have the same name as
the page itself but with a `.scss` extension.

## Global CSS

Any CSS which is not specific to a component or page should live in the `theme`
folder and should be done with caution as these styles are global, this sort
of styling should ideally be limited to theming.

## Variables

Global sass-style variables and CSS colour variables are used in the project.

All variables are usable in any scss file in the project without importing.

e.g.

```scss
border-radius: $border-radius;
```

The example above will set the border-radius property to the value of the
`$border-radius` variable in `_others.scss` file in the `theme` folder.

## Functions

Several functions also exist to allow for cleaner code. These are used in a
similar way to variables.

e.g.

```scss
margin: margin(3);
```

is the equivalent of writing:

```scss
margin: $margin * 3;
```

Functions can be found in the `theme` folder at the bottom of the variable file
they are in reference to (e.g. the spacing related function used above can be
found in `_spacing.scss`).

## Mixins

Mixins are similar to functions, except they return whole SCSS snippets instead
of just values. For an example of a mixin, look at the 'responsive mixin' in
the section below

Mixins can be found at the bottom of the variable file they are in reference to,
however, there is also a mixin in the breakpoint.scss file as well as the
utilities file (see below).

## Utilities

Utilities are a set of pre-made mixins created to help to quickly add
standardised styles to DOM elements. To use a utility, it's the same as the use
of any mixin except you need to prefix it with `utils`:

e.g.

```scss
.my-card-like-component {
  @include utils.card();
}
```

## Responsive

Breakpoint variables and mixins are set in /themes/\_breakpoints.scss. All
breakpoints use `min-width` to ensure that mobile-first design is used.

There are global breakpoints set as follows:

| name           | size   |
| -------------- | ------ |
| `large`        | 1600px |
| `medium-large` | 1280px |
| `medium`       | 1024px |
| `medium-small` | 550px  |
| `small`        | 420px  |
| `extra-small`  | 321px  |

Similar to the above, breakpoints can be referenced without needing to import
them e.g. `$bp-medium-large` is ready to use in any scss file.

Custom breakpoints should be added at any point the layout breaks, these should
be scoped to the component wherever possible.

## Responsive Mixin

To make writing media queries easier, there is a mq mixin which can be used as
follows:

```scss
@include mq($bp-large) {
  margin: 0 auto;
}
```

This is the equivalent of writing:

```scss
@media only screen and (min-width: $bp-large) {
  margin: 0 auto;
}
```

You can also use custom values in the mixin:

```scss
@include mq('500px') {
  margin: 0 auto;
}
```

<blockquote class="tip-wrapper">
  <strong class="warning">Note</strong>
  As we build things on a mobile-first basis, the mixin only supports
  `min-width`. If an edge case arises where you need something else, it is
  acceptable to use a long-form media query but please comment your reasons along
  with the code to avoid it being accidentally refactored at a later date.
</blockquote>

[sass]: https://sass-lang.com/ 'Sass'
[css-modules]: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/ "React's CSS Modules"
[bem notation]: http://getbem.com/introduction/ 'BEM Notation'
