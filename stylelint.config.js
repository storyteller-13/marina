"use strict";

module.exports = {
  extends: ["stylelint-config-recommended"],
  ignoreFiles: ["**/frameworks.min.css", "**/github.min.css"],
  rules: {
    // Existing theme + custom CSS share selectors; this rule is too noisy here.
    "no-descending-specificity": null,
  },
  overrides: [
    {
      // GitHub Primer color tokens: later custom properties intentionally override earlier ones.
      files: ["public/css/dark.css", "public/css/light.css"],
      rules: {
        "declaration-block-no-duplicate-custom-properties": null,
      },
    },
  ],
};
