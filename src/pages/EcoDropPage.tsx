
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

const EcoDropPage = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">EcoDrop+</h1>
        <p className="text-sm text-muted-foreground">Complete eco-tasks for bonus rewards</p>
      </header>
      
      <Card className="mb-8">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-eco-blue/20 flex items-center justify-center mb-4">
            <Activity className="h-8 w-8 text-eco-blue" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Coming Soon!</h2>
          <p className="text-muted-foreground">
            EcoDrop+ will let you complete eco-friendly tasks around your city for bonus rewards!
          </p>
        </CardContent>
      </Card>
      
      <section>
        <h2 className="text-lg font-medium mb-4">Future Features</h2>
        <div className="space-y-4">
          {[
            {
              title: "Location-Based Tasks",
              description: "Find and complete eco-friendly tasks near you"
            },
            {
              title: "Eco Challenges",
              description: "Join weekly sustainability challenges"
            },
            {
              title: "Community Clean-ups",
              description: "Organize and participate in local clean-up events"
            },
            {
              title: "Green Businesses",
              description: "Discover and support sustainable businesses"
            }
          ].map((feature, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <h3 className="font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EcoDropPage;
