"use client";

import { usePathname, useRouter } from "next/navigation";

import { toast } from "@workspace/ui/components/sonner";

import { useSignOut } from "@/hooks/use-auth";

import { DentistrySidebar } from "./dentistry-sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const AUTH_PATHS = ["/sign-in", "/sign-up"];

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = AUTH_PATHS.includes(pathname);
  const signOutMutation = useSignOut();

  const handleLogout = async () => {
    try {
      const result = await signOutMutation.mutateAsync();

      if (result.success) {
        toast.success(result.message);
        router.push("/sign-in");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to sign out. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      <DentistrySidebar onLogout={handleLogout} isLoggingOut={signOutMutation.isPending} />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
