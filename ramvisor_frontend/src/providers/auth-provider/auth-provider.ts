"use client";

import { AuthProvider, CheckResponse, OnErrorResponse } from "@refinedev/core";
import nookies from "nookies";
import { API_URL } from "@providers/data-provider";

export const COOKIE_NAME = "user-id";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password)
          }
        `,
        variables: { email, password },
      }),
    });

    const result = await response.json();

    if (result.data && result.data.login) {
      const userId = result.data.login;
      nookies.set(null, COOKIE_NAME, userId, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Invalid email or password",
        name: "Invalid credentials",
      },
    };
  },
  register: async ({ email, password }) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Register($input: RegisterInput!) {
            register(input: $input)
          }
        `,
        variables: { 
          input: { email, password }
        },
      }),
    });

    const result = await response.json();

    if (result.data && result.data.register) {
      const userId = result.data.register;
      nookies.set(null, COOKIE_NAME, userId, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Registration failed",
        name: "Invalid registration details",
      },
    };
  },
  logout: async () => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Logout {
            logout
          }
        `,
      }),
    });

    const result = await response.json();

    if (result.data && result.data.logout) {
      nookies.destroy(null, COOKIE_NAME);
      return {
        success: true,
        redirectTo: "/login",
      };
    }

    return {
      success: false,
      error: {
        message: "Logout failed",
        name: "LogoutError",
      },
    };
  },
  check: async (): Promise<CheckResponse> => {
    const cookies = nookies.get(null);
    const userId = cookies[COOKIE_NAME];

    if (userId) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Not authenticated",
        name: "not authenticated",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  onError: async (error: any): Promise<OnErrorResponse> => {
    console.error(error);
    return { error };
  },
  getIdentity: async () => {
    const cookies = nookies.get(null);
    const userId = cookies[COOKIE_NAME];
    if (userId) {
      return { id: userId };
    }
    return null;
  },
  getPermissions: async () => null,
};