
import React, { useState, useEffect } from "react";
import { cn, formatNumber } from "@/lib/utils";
import CircularProgress from "./CircularProgress";
import { Leaf, Activity } from "lucide-react";

interface StepCounterProps {
  steps: number;
  goal?: number;
  className?: string;
}

const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    // If the value is 0, reset immediately
    if (value === 0) {
      setDisplayValue(0);
      return;
    }
    
    // Animation duration based on value (larger values = longer animation)
    const duration = Math.min(1500, Math.max(800, value * 0.2));
    const startTime = Date.now();
    const startValue = displayValue;
    
    const updateValue = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        const newValue = Math.floor(startValue + ((value - startValue) * elapsed) / duration);
        setDisplayValue(newValue);
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(updateValue);
  }, [value]);
  
  return (
    <div className="flex items-center justify-center">
      <Activity className="h-5 w-5 mr-2 text-primary animate-pulse-green" />
      <span className="text-2xl font-bold text-primary">
        {formatNumber(displayValue)}
      </span>
    </div>
  );
};

const StepCounter = ({ steps, goal = 10000, className }: StepCounterProps) => {
  const progress = Math.min((steps / goal) * 100, 100);
  // Calculate CO2 savings: approximately 0.2 grams CO2 saved per step
  const co2Saved = steps * 0.2;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <CircularProgress progress={progress} size={220} className="text-primary">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">{formatNumber(steps)}</span>
          <span className="text-sm text-muted-foreground">steps today</span>
          <span className="mt-2 text-xs text-muted-foreground">
            Goal: {formatNumber(goal)} steps
          </span>
          
          <div className="mt-4 flex items-center bg-green-50 rounded-full px-3 py-1 text-green-700">
            <Leaf className="h-4 w-4 mr-1 text-green-500" />
            <span className="text-xs font-medium">
              {co2Saved < 1000 
                ? `${co2Saved.toFixed(1)} g` 
                : `${(co2Saved / 1000).toFixed(2)} kg`} CO₂ saved
            </span>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <AnimatedCounter value={steps} />
            <p className="text-xs text-blue-700 mt-1">Real-time counter</p>
          </div>
        </div>
      </CircularProgress>
    </div>
  );
};

export default StepCounter;
