"use client";

import { AuthProvider } from "@refinedev/core";
import {
  serverLogin,

} from "./auth-provider.server";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    return await serverLogin(email, password);
  },

  // register: async ({ email, password }) => {
  //   return await serverRegister(email, password);
  // },
  //
  // check: async () => {
  //   return await serverCheck();
  // },
  //
  // logout: async () => {
  //   return await serverLogout();
  // },
  //
  // getIdentity: async () => {
  //   return await getServerIdentity();
  // },
  //
  // getPermissions: async () => {
  //   return await getServerPermissions();
  // },
  //
  // onError: async (error) => {
  //   return await handleServerError(error);
  // },

};