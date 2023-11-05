import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/integrations/github/graphql/schema.json',
  documents: ['src/integrations/github/graphql/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/integrations/graphql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
      plugins: ["typescript", "typescript-operations"]
    },
  },
}
