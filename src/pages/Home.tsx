import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Welcome to MoveMate</h1>
        <p className="text-muted-foreground">
          Explore our eco-friendly transportation options and services.
        </p>
      </section>

      <section className="grid gap-4">
        <Link to="/ecodrop" state={{ fromSelection: true }}>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between py-6 hover:border-eco-green"
          >
            <div className="flex items-center gap-3">
              <div className="bg-eco-green/10 p-2 rounded-full">
                <span className="h-5 w-5 text-eco-green">🚲</span>
              </div>
              <div className="text-left">
                <h2 className="font-medium">MoveMate Services</h2>
                <p className="text-sm text-muted-foreground">Complete tasks and earn rewards</p>
              </div>
            </div>
            <span className="text-muted-foreground">→</span>
          </Button>
        </Link>
        
        
      </section>
    </div>
  );
};

export default Home;
