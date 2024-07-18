"use client";

import { AuthProvider, CheckResponse, OnErrorResponse } from "@refinedev/core";
import nookies from "nookies";
import { API_URL } from "@providers/data-provider";

export const COOKIE_NAME = "gql-api";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation LoginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password)
          }
        `,
        variables: { email, password },
      }),
    });

    const result = await response.json();

    if (result.data.loginUser) {
      const cookieValue = JSON.stringify(result.data.loginUser);
      nookies.set(null, COOKIE_NAME, cookieValue, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      
      // Debug logging
      console.log('Cookie set:', COOKIE_NAME);
      console.log('Cookie value:', cookieValue);
      console.log('All cookies:', nookies.get(null));

      return {
        authenticated: true,
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
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
          mutation RegisterUser($email: String!, $password: String!) {
            registerUser(email: $email, password: $password)
          }
        `,
        variables: { email, password },
      }),
    });

    const result = await response.json();

    if (result.data.registerUser) {
      nookies.set(null, COOKIE_NAME, JSON.stringify(result.data.loginUser))
      return {
        authenticated: true,
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
          mutation LogoutUser {
            logoutUser
          }
        `,
      }),
    });

    const result = await response.json();

    if (result.data.logoutUser) {
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
    let user = undefined;

      const cookies = nookies.get(null);
      user = cookies[COOKIE_NAME];

    if (user) {
      return {
        authenticated: true,
        redirectTo: "/",
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  onError: async (error: any): Promise<OnErrorResponse> => {
    console.error(error);
    return { error };
  },
  getIdentity: async () => {
    const cookies = nookies.get(null);
    const user = cookies[COOKIE_NAME];
    if (user) {
      return JSON.parse(user);
    }
    return null;
  },
  getPermissions: async () => null,
};
