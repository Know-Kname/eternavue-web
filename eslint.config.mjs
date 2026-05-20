import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'src/gql/__generated__/**'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Raw apostrophes and quotes in JSX text are valid HTML; escaping them
      // hurts readability with no real benefit.
      'react/no-unescaped-entities': 'off',
    },
  },
]

export default eslintConfig
