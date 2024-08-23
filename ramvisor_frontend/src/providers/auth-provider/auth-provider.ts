"use client";

import { AuthProvider, CheckResponse, OnErrorResponse } from "@refinedev/core";
import { API_URL } from "@providers/data-provider";

export const COOKIE_NAME = "user-id";

// Helper function to get cookie
const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Login($input: LoginInput!) {
            login(input: $input)
          }
        `,
        variables: { input: { email, password } },
      }),
    });

    const result = await response.json();

    if (result.data && result.data.login) {
      const userId = result.data.login;
      document.cookie = `${COOKIE_NAME}=${userId}; path=/; max-age=${30 * 24 * 60 * 60}`;

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
          input: { email, password },
        },
      }),
    });

    const result = await response.json();

    if (result.data && result.data.register) {
      const userId = result.data.register;
      console.log(`User id is: ${userId}`);
      document.cookie = `${COOKIE_NAME}=${userId}; path=/; max-age=${30 * 24 * 60 * 60}`;
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
      document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
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
    console.log("Checking authentication...");
    console.log("Document cookies:", document.cookie);
    const userId = getCookie(COOKIE_NAME);
    console.log("User ID from cookie:", userId);

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
    const userId = getCookie(COOKIE_NAME);
    if (userId) {
      return { id: userId };
    }
    return null;
  },
  getPermissions: async () => null,
};