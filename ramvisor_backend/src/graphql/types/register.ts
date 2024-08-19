import { extendType, nonNull, inputObjectType } from "nexus";
import { registerResolve } from "../resolvers/registerResolver";

export const RegisterInput = inputObjectType({
  name: 'RegisterInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const RegisterMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('register', {
      type: 'Boolean',
      args: {
        input: nonNull(RegisterInput),
      },
      resolve: registerResolve,
    });
  },
});