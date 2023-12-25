import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './app/integrations/github/graphql/schema.json',
  documents: ['app/integrations/github/graphql/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './app/integrations/github/graphql/sdk.ts': {
      config: {
        nonOptionalTypename: true,
        useTypeImports: true,
      },
      plugins: ["typescript", "typescript-graphql-request", "typescript-operations"]
    },
  },
}

export default config