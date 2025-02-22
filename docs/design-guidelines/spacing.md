# Spacing

## Component Spacing

Component spacing is the vertical and horizontal distance between components in
a layout. This should not be confused with gutters and margins (see below)

Component Spacing is defined in the $componentSpacing variable and is curently 1.5rem;

## Gutters

Gutters are the spaces between grid items. They are defined in the `$gutters` variable
and is currently `1rem`.

## Margins

Margin is the space between any element on the page, the margin is defined in the
$margin variable and is currently `1rem` by default, however this is configurable
on a per-component basis.

The `margin()` mixin is used to generate the margin for a component and should be
used wherever a margin is required.

```scss
.my-component {
  @include margin(1.5); // margin of 1.5rem
}
```

## Padding

Padding is the space between the edge and the content of an element. It is defined
in the $padding variable and is currently 1rem by default, however this is
configurable on a per-component basis.

The `padding()` mixin is used to generate the padding for a component and should
be used wherever padding is required.

```scss
.my-component {
  @include padding(0.5); // padding of .5rem
}
```
