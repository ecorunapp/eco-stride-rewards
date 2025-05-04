
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background">
      {/* Main content area */}
      <main className="flex-1 overflow-auto pb-16">
        <Outlet />
      </main>
      
      {/* Fixed bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Layout;
