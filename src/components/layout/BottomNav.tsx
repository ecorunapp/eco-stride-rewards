
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, Activity, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      icon: Wallet,
      label: "Wallet",
      path: "/wallet",
    },
    {
      icon: Activity,
      label: "EcoDrop+",
      path: "/ecodrop",
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
    },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-1",
                "transition-colors duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                isActive && "text-primary"
              )} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
