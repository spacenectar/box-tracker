# ADR 008: Form management

- **Date created**: 04/02/2025
- **Driver**: Alex Foxleigh (Foxy)

## Status

![accepted]

## Context

We need a way to manage form input in the application. We will be investigating
the following options:

- [Formik](https://formik.org/)
- [React Hook Form](https://react-hook-form.com/)

I have used Formik in the past and it has worked well. It is a very powerful
tool which can be used to manage complex forms. It also has a very large
community. However, the bundle size is larger than
react-hook-form and it is also no longer being actively maintained.

React Hook Form is lightweight and provides all of the functionality of Formiks `useFormik` hook.
It is also very well supported and has a large community. It is also actively maintained and
very straightforward to use.

## Advice

As much as I like Formik, I would recommend using React Hook Form simply on the basis that
it is still being actively maintained. Using a library which is no longer being maintained
is a risk and could cause issues in the future.

## Discussions

- Alex Foxleigh - This is the place to discuss the ADR. Please keep the discussion
  on topic and try to avoid repeating the same points. Please put your name next to
  any points you make.

## Decision

Implement React Hook Form into the application.

## Consequences

- Creating forms will be easier.
- We will also need to install the 'yup' library to handle form validation.
- There will be a small learning curve for new developers.
- Developers who are already used to Redux may find the paradigm shift confusing
  at first.

[proposed]: https://img.shields.io/badge/Proposed-yellow?style=for-the-badge
[accepted]: https://img.shields.io/badge/Accepted-green?style=for-the-badge
[superceded]: https://img.shields.io/badge/Superceded-orange?style=for-the-badge
[rejected]: https://img.shields.io/badge/Rejected-red?style=for-the-badge
[deprecated]: https://img.shields.io/badge/Deprecated-grey?style=for-the-badge
