import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './app/integrations/github/graphql/schema.json',
  documents: ['app/integrations/github/graphql/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './app/integrations/graphql.ts': {
      config: {
        useTypeImports: true,
      },
      plugins: ["typescript", "typescript-operations", "typed-document-node"]
    },
  },
}

export default config