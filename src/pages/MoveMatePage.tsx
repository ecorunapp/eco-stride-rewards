
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpFromLine } from "lucide-react";

const MoveMatePage = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">MoveMate+</h1>
        <p className="text-sm text-muted-foreground">Smart mobility rentals</p>
      </header>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-eco-blue/20 p-3 rounded-full">
              <ArrowUpFromLine className="h-6 w-6 text-eco-blue" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Eco-Friendly Mobility</h2>
              <p className="text-sm text-muted-foreground">Rent smart devices for your journey</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Available Rentals</h3>
              <p className="text-sm text-muted-foreground">Find e-bikes, scooters, and more near you</p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">Get personalized mobility suggestions</p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Rental History</h3>
              <p className="text-sm text-muted-foreground">View your past rentals and earned rewards</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoveMatePage;
