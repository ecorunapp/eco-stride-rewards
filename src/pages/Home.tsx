import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

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
        <Link to="/drop-select" state={{ fromSelection: true }}>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between py-6 hover:border-eco-green"
          >
            <div className="flex items-center gap-3">
              <div className="bg-eco-green/10 p-2 rounded-full">
                <Package className="h-5 w-5 text-eco-green" />
              </div>
              <div className="text-left">
                <h2 className="font-medium">EcoDrop Services</h2>
                <p className="text-sm text-muted-foreground">Complete eco tasks and earn rewards</p>
              </div>
            </div>
            <span className="text-muted-foreground">→</span>
          </Button>
        </Link>
        
        {/* Keep other navigation buttons */}
      </section>
    </div>
  );
};

export default Home;
