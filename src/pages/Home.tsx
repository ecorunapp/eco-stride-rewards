
import React from "react";
import { useUserData } from "@/contexts/UserDataContext";
import { getMotivationalMessage, useCurrentDate } from "@/lib/utils";
import StepCounter from "@/components/StepCounter";
import CoinDisplay from "@/components/CoinDisplay";
import { Button } from "@/components/ui/button";

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
      </div>
    </div>
  );
};

export default Home;
