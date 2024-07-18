import type { AuthProvider, CheckResponse } from "@refinedev/core";
import nookies from "nookies";
import { GetServerSidePropsContext } from "next";

const COOKIE_NAME = "gql-api";

// Extend CheckResponse to include userData
interface ExtendedCheckResponse extends CheckResponse {
  userData?: any;
}

export const authProviderServer: Pick<AuthProvider, "check"> = {
  check: async (ctx?: GetServerSidePropsContext): Promise<ExtendedCheckResponse> => {
    console.log("Context headers:", ctx?.req?.headers);
    console.log("Context cookies:", ctx?.req?.cookies);

    const cookies = nookies.get(ctx || null);
    
    console.log("All cookies from nookies:", cookies);
    console.log("Specific auth cookie:", cookies[COOKIE_NAME]);

    const authCookie = cookies[COOKIE_NAME];

    if (authCookie) {
      try {
        const userData = JSON.parse(authCookie);
        console.log("Parsed user data:", userData);
        
        return {
          authenticated: true,
          userData: userData,
        };
      } catch (error) {
        console.error("Error parsing auth cookie:", error);
      }
    }

    console.log("No valid auth cookie found");
    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
};

// Usage in getServerSideProps
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log("getServerSideProps called");
  const authResult = await authProviderServer.check(ctx);

  console.log("Auth check result:", authResult);

  if (!authResult.authenticated) {
    console.log("Redirecting to:", authResult.redirectTo);
    return {
      redirect: {
        destination: authResult.redirectTo || "/login",
        permanent: false,
      },
    };
  }

  // Only pass userData if it exists
  return {
    props: authResult ? { userData: authResult } : {},
  };
};