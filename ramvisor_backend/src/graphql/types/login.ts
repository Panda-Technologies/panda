import { extendType, stringArg, nonNull } from "nexus";
import { loginResolve } from "../resolvers/loginResolver";

export const LoginMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: loginResolve
    })
  }
})