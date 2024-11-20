"use server";

const API_URL = 'http://localhost:5001/graphql';

export async function serverLogin(email: string, password: string) {
  if (!API_URL) throw new Error('API_URL is not defined');

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                    mutation Login($input: LoginInput!) {
                        login(input: $input)
                    }
                `,
        variables: {
          input: { email, password },
        },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      return {
        success: false,
        error: {
          message: result.errors[0].message,
          name: "LoginError",
        },
      };
    }

    if (result.data && result.data.login) {
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
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: {
        message: "An unexpected error occurred",
        name: "ServerError",
      },
    };
  }
}

export async function serverRegister(email: string, password: string) {
  if (!API_URL) throw new Error('API_URL is not defined');

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      credentials: 'include',
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

    if (result.errors) {
      return {
        success: false,
        error: {
          message: result.errors[0].message,
          name: "RegistrationError",
        },
      };
    }

    if (result.data && result.data.register) {
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Registration failed",
        name: "RegistrationError",
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: {
        message: "An unexpected error occurred",
        name: "ServerError",
      },
    };
  }
}

export async function serverCheck() {
  if (!API_URL) throw new Error('API_URL is not defined');

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                    query Me {
                        me {
                            id
                            email
                        }
                    }
                `
      }),
    });

    const result = await response.json();

    if (result.errors) {
      return {
        authenticated: false,
        error: {
          message: result.errors[0].message,
          name: "AuthenticationError",
        },
        redirectTo: "/login",
      };
    }

    if (result.data?.me) {
      return {
        authenticated: true,
        user: result.data.me,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Not authenticated",
        name: "AuthenticationError",
      },
      redirectTo: "/login",
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return {
      authenticated: false,
      error: {
        message: "An unexpected error occurred",
        name: "ServerError",
      },
      redirectTo: "/login",
    };
  }
}

export async function serverLogout() {
  if (!API_URL) throw new Error('API_URL is not defined');

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      credentials: 'include',
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

    if (result.errors) {
      return {
        success: false,
        error: {
          message: result.errors[0].message,
          name: "LogoutError",
        },
      };
    }

    if (result.data?.logout) {
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
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: {
        message: "An unexpected error occurred",
        name: "ServerError",
      },
    };
  }
}

export async function getServerIdentity() {
  const checkResult = await serverCheck();
  return checkResult.authenticated ? checkResult.user : null;
}

export async function getServerPermissions() {
  return null;
}

export async function handleServerError(error: any) {
  console.error('Server error:', error);
  return { error };
}

export interface AuthResponse {
  success: boolean;
  redirectTo?: string;
  error?: {
    message: string;
    name: string;
  };
}

export interface CheckResponse {
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
  };
  error?: {
    message: string;
    name: string;
  };
  redirectTo?: string;
}