
import React from "react";
import { cn, formatNumber } from "@/lib/utils";
import CircularProgress from "./CircularProgress";
import { Leaf } from "lucide-react";

interface StepCounterProps {
  steps: number;
  goal?: number;
  className?: string;
}

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
        </div>
      </CircularProgress>
    </div>
  );
};

export default StepCounter;
