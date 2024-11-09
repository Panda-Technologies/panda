import { AuthPage } from "@components/auth-page";
import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";
import React from "react";
import { checkIfUserNeedsQuestionnaire } from "@utils/check-questionnaire";
import {useGetIdentity} from "@refinedev/core"; // Import the function

export default async function Login() {
  const { data: identity } = useGetIdentity<{ id: string }>();
  const userId = identity?.id;

  if (userId) {
    const userNeedsQuestionnaire = await checkIfUserNeedsQuestionnaire(userId);

    if (userNeedsQuestionnaire) {
      redirect("/multistepform"); // Redirect to the multi-step questionnaire
    } else {
      redirect("/dashboard"); // Redirect to the dashboard
    }
  }

  return <AuthPage type="login" />;
}

async function getData() {
  const { authenticated, redirectTo, error, userId } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
    userId,
  };
}
