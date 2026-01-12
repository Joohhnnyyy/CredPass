import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  action?: React.ReactNode;
}

export function DashboardCard({ title, action, children, className, ...props }: DashboardCardProps) {
  return (
    <div className={cn("bg-[#121214] rounded-xl p-5 border border-white/5 flex flex-col", className)} {...props}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="flex-1 relative">{children}</div>
    </div>
  );
}
