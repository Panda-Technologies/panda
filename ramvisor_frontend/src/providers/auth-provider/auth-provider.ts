"use client";

import { AuthProvider } from "@refinedev/core";
import { serverLogin } from "./auth-provider.server";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    return await serverLogin(email, password);
  },

  register: async ({ email, password }) => {
    // Mock successful registration
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    // Mock authenticated state
    const token = localStorage.getItem("auth-token");
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: new Error("Not authenticated"),
      logout: true,
      redirectTo: "/login",
    };
  },

  logout: async () => {
    // Mock logout
    localStorage.removeItem("auth-token");
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  getIdentity: async () => {
    // Mock user identity
    return {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };
  },

  getPermissions: async () => {
    // Mock permissions
    return ["admin"];
  },

  onError: async (error) => {
    // Mock error handling
    console.error(error);
    return { error };
  },
};