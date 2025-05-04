
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to format large numbers with comma separators
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get a motivational message based on step count
export function getMotivationalMessage(steps: number): string {
  if (steps < 1000) {
    return "Every step matters for our planet!";
  } else if (steps < 5000) {
    return "You're making progress! Keep it up!";
  } else if (steps < 10000) {
    return "Halfway to your daily goal! Great work!";
  } else {
    return "Amazing effort! You're an eco-champion today!";
  }
}

// Calculate eco coins from steps (1 coin per 100 steps)
export function calculateEcoCoins(steps: number): number {
  return Math.floor(steps / 100);
}

// Custom hook to get current date in readable format
export function useCurrentDate(): string {
  const [date, setDate] = useState("");
  
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setDate(now.toLocaleDateString(undefined, options));
    };
    
    updateDate();
    const timer = setInterval(updateDate, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  return date;
}

// Simulate step counts since we can't use actual pedometer in web version
export function useSimulatedStepCounter() {
  const [steps, setSteps] = useState(0);
  
  useEffect(() => {
    // Simulate steps increasing over time (for demo purposes)
    const incrementSteps = () => {
      setSteps(prevSteps => {
        const newSteps = prevSteps + Math.floor(Math.random() * 10) + 1;
        return newSteps;
      });
    };
    
    const interval = setInterval(incrementSteps, 3000); // Add steps every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return steps;
}

// Helper function to load data from localStorage
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved) as T;
    }
  }
  return defaultValue;
}

// Helper function to save data to localStorage
export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// Function to reset daily step count at midnight
export function setupDailyReset(callback: () => void) {
  const getMillisecondsUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now.getTime();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
      // Reset timer for next day
      setupDailyReset(callback);
    }, getMillisecondsUntilMidnight());
    
    return () => clearTimeout(timer);
  }, [callback]);
}
