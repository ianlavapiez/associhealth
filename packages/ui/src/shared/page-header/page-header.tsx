import { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ title, children, actions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
