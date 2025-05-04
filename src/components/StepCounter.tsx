
import React from "react";
import { cn, formatNumber } from "@/lib/utils";
import CircularProgress from "./CircularProgress";

interface StepCounterProps {
  steps: number;
  goal?: number;
  className?: string;
}

const StepCounter = ({ steps, goal = 10000, className }: StepCounterProps) => {
  const progress = Math.min((steps / goal) * 100, 100);
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <CircularProgress progress={progress} size={220} className="text-primary">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">{formatNumber(steps)}</span>
          <span className="text-sm text-muted-foreground">steps today</span>
          <span className="mt-2 text-xs text-muted-foreground">
            Goal: {formatNumber(goal)} steps
          </span>
        </div>
      </CircularProgress>
    </div>
  );
};

export default StepCounter;
