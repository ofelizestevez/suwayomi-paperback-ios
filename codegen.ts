
import type { CodegenConfig } from '@graphql-codegen/cli'

process.loadEnvFile(".env")

const schema = process.env.SUWAYOMI_GRAPHQL_URL

if (!schema) {
  throw new Error('SUWAYOMI_GRAPHQL_URL is not configured')
}

const config: CodegenConfig = {
  schema,

  documents: [
    'src/Suwayomi/api/operations/**/*.graphql',
  ],

  generates: {
    'src/Suwayomi/api/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        useTypeImports: true,
        scalars: {
          LongString: 'string',
          Cursor: 'string',
          Duration: 'string',
        },
      },
    },
  },
}

export default config
