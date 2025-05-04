
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

const EcoDropPage = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">EcoDrop+</h1>
        <p className="text-sm text-muted-foreground">Complete eco-tasks for rewards</p>
      </header>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-eco-green/20 p-3 rounded-full">
              <Package className="h-6 w-6 text-eco-green" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Task Board</h2>
              <p className="text-sm text-muted-foreground">Find and complete tasks in your area</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Available Tasks</h3>
              <p className="text-sm text-muted-foreground">Browse eco-friendly tasks near you</p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Your Active Tasks</h3>
              <p className="text-sm text-muted-foreground">Track tasks you're currently working on</p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Completed Tasks</h3>
              <p className="text-sm text-muted-foreground">View your history and total earnings</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcoDropPage;
