import { Metadata } from "next";

import { dentistryConfig } from "@workspace/configs";

import { SignInComponent } from "@/components/sign-in";

export const metadata: Metadata = {
  title: "Login",
  description: dentistryConfig.seo.description,
};

export default function SignInPage() {
  return <SignInComponent />;
}
