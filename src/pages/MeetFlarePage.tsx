
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const MeetFlarePage = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">MeetFlare</h1>
        <p className="text-sm text-muted-foreground">Find running partners near you</p>
      </header>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-eco-blue/20 p-3 rounded-full">
              <Users className="h-6 w-6 text-eco-blue" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Find Your Running Buddy</h2>
              <p className="text-sm text-muted-foreground">Match with people who share your pace and interests</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Preferences</h3>
              <p className="text-sm text-muted-foreground">Set your running preferences to find better matches</p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Nearby Runners</h3>
              <p className="text-sm text-muted-foreground">Discover people around you ready for a run</p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium mb-1">Your Matches</h3>
              <p className="text-sm text-muted-foreground">View and chat with your running matches</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetFlarePage;
