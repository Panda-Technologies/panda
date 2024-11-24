import { AuthPage } from "@components/auth-page";
import { redirect } from "next/navigation";
import {serverCheck} from "@providers/auth-provider";

export default async function ForgotPassword() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <AuthPage type="forgotPassword" />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await serverCheck();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
