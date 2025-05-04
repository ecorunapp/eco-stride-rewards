
import React from "react";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

interface CoinDisplayProps {
  coins: number;
  className?: string;
}

const CoinDisplay = ({ coins, className }: CoinDisplayProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="bg-eco-yellow/20 p-2 rounded-full">
        <Coins className="h-6 w-6 text-eco-yellow" />
      </div>
      <div>
        <p className="text-sm font-medium">{coins} ecoCoins</p>
        <p className="text-xs text-muted-foreground">earned today</p>
      </div>
    </div>
  );
};

export default CoinDisplay;
