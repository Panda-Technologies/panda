import { AuthPage } from "@components/auth-page";
import { serverCheck } from "@providers/auth-provider";
import { redirect } from "next/navigation";

export default async function Register() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <AuthPage type="register" />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await serverCheck();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
