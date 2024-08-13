import { extendType } from "nexus";
import { logoutResolve } from "../resolvers/loginResolver";

export const LogoutMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('logout', {
      type: 'Boolean',
      resolve: logoutResolve
    })
  }
})