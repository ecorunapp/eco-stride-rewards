
import React from "react";
import { cn, formatNumber } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";

interface EcoTabProps {
  coinBalance: number;
  className?: string;
}

const EcoTab = ({ coinBalance, className }: EcoTabProps) => {
  return (
    <Card className={cn("overflow-hidden shadow-lg", className)}>
      <div className="eco-card p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-lg">EcoTab Card</h3>
            <p className="text-xs opacity-80">Environmental Rewards</p>
          </div>
          <Coins className="h-8 w-8 text-eco-yellow animate-pulse-eco" />
        </div>
        
        <div className="mt-6 flex justify-between items-end">
          <div>
            <p className="text-sm opacity-80">Total Balance</p>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {formatNumber(coinBalance)}
              <span className="text-lg">ecoCoins</span>
            </h2>
          </div>
          <div className="opacity-50 text-xs">
            Member Since 2025
          </div>
        </div>
      </div>
      <CardContent className="p-4 bg-background">
        <div className="text-xs text-center text-muted-foreground">
          Tap to view rewards and partner discounts
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoTab;
