"use client";

import { usePathname } from "next/navigation";

import { DentistrySidebar } from "./dentistry-sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const AUTH_PATHS = ["/sign-in", "/sign-up"];

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      <DentistrySidebar />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
