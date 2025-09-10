import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Emilio Rivera's Portfolio",
  description: "Sign in to your account",
};

import SignInForm from "@/features/auth/components/form/SignInForm";

/**
 * The login page
 * 
 * @returns
 */
const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen mt-[6%]">
      <SignInForm />
    </div>
  );
};

export default LoginPage;
