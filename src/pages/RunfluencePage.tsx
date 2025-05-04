
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Footprints } from "lucide-react";

const RunfluencePage = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Runfluence</h1>
        <p className="text-sm text-muted-foreground">Creator monetization platform</p>
      </header>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-eco-green/20 p-3 rounded-full">
              <Footprints className="h-6 w-6 text-eco-green" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Fitness Creator Platform</h2>
              <p className="text-sm text-muted-foreground">Share content, gain followers, earn rewards</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Creator Feed</h3>
              <p className="text-sm text-muted-foreground">Discover fitness content from top creators</p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Creator Store</h3>
              <p className="text-sm text-muted-foreground">Shop eco-friendly products from our partners</p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Your Profile</h3>
              <p className="text-sm text-muted-foreground">Build your creator presence and share content</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunfluencePage;
