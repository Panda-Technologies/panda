import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "http://localhost:5001/graphql",
  documents: ["src/graphql/mutations.ts", "src/graphql/queries.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      plugins: []
    },
    "./src/graphql/generated/schema.types.ts": {
      plugins: ["typescript"],
      config: {
        skipTypename: true,
        enumsAsTypes: true,
        scalars: {
          DateTime: {
            input: "string",
            output: "string",
            format: "date-time",
          },
        },
      },
    },
    "./src/graphql/generated/types.ts": {
      preset: "import-types",
      plugins: ["typescript-operations"],
      presetConfig: {
        typesPath: "./schema.types",
      },
      config: {
        skipTypename: true,
        enumsAsTypes: true,
        preResolveTypes: false,
        useTypeImports: true,
      },
    },
  },
  hooks: {
    afterOneFileWrite: ["eslint --fix", "prettier --write"],
  },
};

export default config;