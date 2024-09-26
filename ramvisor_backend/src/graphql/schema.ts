import { declarativeWrappingPlugin, makeSchema } from "nexus";
import path from "path";
import * as types from "./types";

export const getSchema = async () => {
  const schema = makeSchema({
    types: [types],
    plugins: [declarativeWrappingPlugin()],
    outputs: {
      schema: path.join(process.cwd(), "nexus", "schema.graphql"),
      typegen: path.join(process.cwd(), "nexus", "nexus.ts"),
    },
    contextType: {
      module: path.join(process.cwd(), 'src', 'interface.ts'),
      export: "IMyContext",
    },
    sourceTypes: {
      modules: [
        {
          module: "@prisma/client",
          alias: "prisma",
        },
      ],
    },
  });
  return schema;
};