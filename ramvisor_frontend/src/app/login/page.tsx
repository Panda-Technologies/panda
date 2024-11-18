import { AuthPage } from "@components/auth-page";
import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";
import React from "react";
import {useGetIdentity} from "@refinedev/core";

const Login = async () => {
  const userId = "12345";

  if (userId) {
    const userNeedsQuestionnaire = true;

    if (userNeedsQuestionnaire) {
      redirect("/multistepform"); // Redirect to the multi-step questionnaire
    } else {
      redirect("/dashboard"); // Redirect to the dashboard
    }
  }

  return <AuthPage type="login" />;
}

const getData = async () => {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}

export default Login;
