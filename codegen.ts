import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL ?? 'https://deathcare.live/graphql',
  documents: ['src/gql/queries.ts'],
  generates: {
    'src/gql/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
}

export default config
