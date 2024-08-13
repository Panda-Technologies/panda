import { extendType, stringArg, nonNull } from "nexus";
import { registerResolve } from "../resolvers/registerResolver";

export const RegisterMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('register', {
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: registerResolve
    })
  }
})