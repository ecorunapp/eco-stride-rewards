
import React from "react";
import { useUserData } from "@/contexts/UserDataContext";
import { getMotivationalMessage, useCurrentDate } from "@/lib/utils";
import StepCounter from "@/components/StepCounter";
import CoinDisplay from "@/components/CoinDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Footprints, ArrowUpFromLine, Package } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { steps, coins, incrementSteps } = useUserData();
  const currentDate = useCurrentDate();
  const motivationalMessage = getMotivationalMessage(steps);
  
  // Manually add steps (for demo purposes)
  const handleAddSteps = () => {
    incrementSteps(100);
  };
  
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">EcoRun</h1>
        <p className="text-sm text-muted-foreground">{currentDate}</p>
      </header>
      
      <div className="flex flex-col items-center justify-center gap-8">
        <StepCounter steps={steps} />
        
        <div className="text-center">
          <p className="text-sm italic text-muted-foreground mb-4">
            "{motivationalMessage}"
          </p>
          
          <CoinDisplay coins={coins} className="mb-6" />
          
          {/* This button is just for demonstration purposes */}
          <Button 
            onClick={handleAddSteps}
            className="bg-gradient-to-r from-eco-green to-eco-blue text-white"
          >
            Simulate Walking (Demo)
          </Button>
        </div>
        
        <div className="w-full p-4 bg-muted rounded-lg mt-4">
          <h3 className="font-medium mb-2">Daily Progress</h3>
          <p className="text-sm text-muted-foreground">
            You've earned {coins} ecoCoins today by taking {steps} steps.
            That's approximately {(steps * 0.0008).toFixed(2)} km walked!
          </p>
        </div>

        {/* Feature Icons Section */}
        <div className="w-full mt-4">
          <h3 className="font-medium mb-4">Featured Services</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/meetflare">
              <FeatureCard 
                icon={<Users className="h-6 w-6 text-eco-blue" />}
                title="MeetFlare"
                description="Match & Run"
              />
            </Link>
            <Link to="/runfluence">
              <FeatureCard 
                icon={<Footprints className="h-6 w-6 text-eco-green" />}
                title="Runfluence"
                description="Creator system"
              />
            </Link>
            <Link to="/movemate">
              <FeatureCard 
                icon={<ArrowUpFromLine className="h-6 w-6 text-eco-blue" />}
                title="MoveMate+"
                description="Smart rentals"
              />
            </Link>
            <Link to="/ecodrop">
              <FeatureCard 
                icon={<Package className="h-6 w-6 text-eco-green" />}
                title="EcoDrop+"
                description="Task system"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature card component for displaying features
const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="border border-border hover:border-primary/40 transition-colors">
      <CardContent className="flex flex-col items-center p-4 text-center">
        <div className="mb-2 bg-muted p-2 rounded-full">
          {icon}
        </div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Home;
