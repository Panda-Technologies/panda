import { extendType, nonNull, inputObjectType } from "nexus";
import { loginResolve } from "../resolvers/loginResolver";

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const LoginMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'String',
      args: {
        input: nonNull(LoginInput),
      },
      resolve: loginResolve
    })
  }
})
