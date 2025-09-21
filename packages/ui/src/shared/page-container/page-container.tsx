import { cn } from "@workspace/ui/lib/utils";

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingVariants = {
  sm: "px-4 py-4",
  md: "px-6 py-6",
  lg: "px-8 py-8",
};

export function PageContainer({ children, className, padding = "md" }: PageContainerProps) {
  return (
    <div className={cn("container mx-auto", paddingVariants[padding], className)}>{children}</div>
  );
}
