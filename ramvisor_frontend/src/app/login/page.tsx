import { AuthPage } from "@components/auth-page";
import {authProvider, serverCheck} from "@providers/auth-provider";
import { redirect } from "next/navigation";
import React from "react";

export default async function Login() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <AuthPage type="login" />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await serverCheck();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
