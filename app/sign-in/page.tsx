
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Trellis Money",
  description: "Sign in to your Trellis Money account",
};

//Forms
import SignInForm from "@/features/auth/components/form/SignInForm";

//Protected Route
import DashboardRedirect from "@/features/auth/components/private-route/DashboardRedirect";

const LoginPage = () => {
  return (
    // <DashboardRedirect>
      <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen">
        <SignInForm />
      </div>
    // </DashboardRedirect>
  );
};

export default LoginPage;
