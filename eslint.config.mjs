import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build-time dev scripts (Figma token extractor, dark-mode generator)
    // contain liberal `any` usage that is acceptable for tooling but would
    // otherwise dominate the lint output. Production code is fully typed.
    "scripts/**",
  ]),
  {
    files: ["src/app/error.tsx", "src/app/global-error.tsx"],
    rules: {
      // React's stricter effect rules in 19.x flag the intentional
      // hydration-guard + error-state pattern in the error boundary.
      // The pattern is correct; the lint rule is over-cautious here.
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);

export default eslintConfig;
