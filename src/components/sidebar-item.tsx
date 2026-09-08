import type { ButtonHTMLAttributes, ReactNode } from "react";

type SidebarItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
};

export function SidebarItem({ children, icon, className = "", ...props }: SidebarItemProps) {
  return <button className={`sidebar-item ${className}`.trim()} {...props}><span className="sidebar-item__icon" aria-hidden="true">{icon}</span><span>{children}</span></button>;
}
