import { Metadata } from "next";

import { dentistryConfig } from "@workspace/configs";
import { Button } from "@workspace/ui/components/button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: dentistryConfig.seo.description,
};

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh bg-background">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Welcome to {dentistryConfig.name}</h1>
        <p className="text-muted-foreground text-center max-w-md">{dentistryConfig.description}</p>
        <div className="flex gap-2">
          <Button size="sm">Get Started</Button>
          <Button variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
