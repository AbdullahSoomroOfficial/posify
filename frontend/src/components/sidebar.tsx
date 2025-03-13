import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  BarChart2,
  ShoppingCart,
  PanelRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: BarChart2, label: "Stocks", href: "/stocks" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-background border-r",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn("flex items-center justify-between border-b h-16 p-3")}
      >
        {!isCollapsed && <h1 className="text-xl font-bold">POSify</h1>}
        <div
          className="p-[10px] hover:bg-accent rounded-md"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <PanelRight className="rotate-180 h-5 w-5" />
        </div>
      </div>
      <nav className={cn("flex-1 flex flex-col gap-y-3 p-3")}>
        {navItems.map((item) => (
          <NavLink
            to={item.href}
            key={item.href}
            className={({ isActive }) => {
              return cn(
                "flex gap-x-3 p-[10px] text-foreground hover:bg-accent hover:text-accent-foreground rounded-md",
                isActive && "bg-accent text-accent-foreground font-bold"
              );
            }}
          >
            <div className="min-h-5 min-w-5">
              <item.icon className={cn("h-5 w-5")} />
            </div>
            {!isCollapsed && <span className="text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
