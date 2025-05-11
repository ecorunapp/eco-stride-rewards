
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, Package, Users } from "lucide-react";
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
      icon: Users,
      label: "MeetFlare",
      path: "/meetflare",
    },
    {
      icon: Wallet,
      label: "Wallet",
      path: "/wallet",
    },
    {
      icon: Package,
      label: "MoveMate",
      path: "/ecodrop",
    }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-1 relative",
                "transition-colors duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute -top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
              <item.icon className={cn(
                "h-5 w-5 mb-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
