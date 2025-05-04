
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { calculateEcoCoins, loadFromStorage, saveToStorage, setupDailyReset } from "@/lib/utils";

interface UserDataContextType {
  steps: number;
  coins: number;
  totalCoins: number;
  incrementSteps: (amount: number) => void;
  resetDailySteps: () => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<number>(() => 
    loadFromStorage("ecorun_daily_steps", 0)
  );
  
  const [coins, setCoins] = useState<number>(() => 
    loadFromStorage("ecorun_daily_coins", 0)
  );
  
  const [totalCoins, setTotalCoins] = useState<number>(() => 
    loadFromStorage("ecorun_total_coins", 0)
  );
  
  // Simulate step counting with increment function
  const incrementSteps = (amount: number) => {
    setSteps(prevSteps => {
      const newSteps = prevSteps + amount;
      saveToStorage("ecorun_daily_steps", newSteps);
      
      // Calculate new coins
      const newCoins = calculateEcoCoins(newSteps);
      const coinDifference = newCoins - coins;
      
      // Update coins if new ones were earned
      if (coinDifference > 0) {
        setCoins(newCoins);
        saveToStorage("ecorun_daily_coins", newCoins);
        
        // Update total coins
        setTotalCoins(prevTotal => {
          const newTotal = prevTotal + coinDifference;
          saveToStorage("ecorun_total_coins", newTotal);
          return newTotal;
        });
      }
      
      return newSteps;
    });
  };
  
  // Reset daily step count and coins
  const resetDailySteps = () => {
    setSteps(0);
    setCoins(0);
    saveToStorage("ecorun_daily_steps", 0);
    saveToStorage("ecorun_daily_coins", 0);
  };
  
  // Set up daily reset at midnight
  setupDailyReset(resetDailySteps);
  
  // Simulate periodic step incrementing for demo purposes
  useEffect(() => {
    const timer = setInterval(() => {
      // Random step count between 5-20 steps
      incrementSteps(Math.floor(Math.random() * 15) + 5);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <UserDataContext.Provider 
      value={{ 
        steps, 
        coins, 
        totalCoins, 
        incrementSteps, 
        resetDailySteps 
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
