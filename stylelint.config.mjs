const config = {
  customSyntax: 'postcss-scss', // Use SCSS syntax
  plugins: ['stylelint-scss'],
  ignoreFiles: ['**/styles/export/*'],
  rules: {
    // Core rules
    'at-rule-no-unknown': null, // Turn off default handling
    'scss/at-rule-no-unknown': true, // Use SCSS-specific rule
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values']
      }
    ],
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'font-family-no-duplicate-names': true,
    'function-calc-no-unspaced-operator': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true,
    'no-empty-source': true,
    'no-invalid-double-slash-comments': null, // SCSS uses double-slash comments
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': true,
    'shorthand-property-no-redundant-values': true,
    'string-no-newline': true,
    'unit-no-unknown': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'] // CSS Modules pseudo-classes
      }
    ],
    // SCSS-specific rules
    'property-no-unknown': null, // Ignore "composes" (CSS Modules)
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/comment-no-empty': true
  }
};

export default config;
