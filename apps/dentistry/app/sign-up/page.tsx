import { Metadata } from "next";

import { dentistryConfig } from "@workspace/configs";

import { SignUpComponent } from "@/components/sign-up";

export const metadata: Metadata = {
  title: "Sign up",
  description: dentistryConfig.seo.description,
};

export default function SignUpPage() {
  return <SignUpComponent />;
}
