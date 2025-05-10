
import React, { useState } from "react";
import { cn, formatNumber } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, ChevronDown, ChevronUp, Package, Award, CheckCircle2 } from "lucide-react";
import { useUserData } from "@/contexts/UserDataContext";
import { Button } from "@/components/ui/button";

interface EcoTabProps {
  coinBalance: number;
  className?: string;
}

const EcoTab = ({ coinBalance, className }: EcoTabProps) => {
  const { completedTasks } = useUserData();
  const [showTasks, setShowTasks] = useState(false);
  
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
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {completedTasks.length} completed tasks
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setShowTasks(!showTasks)}
          >
            {showTasks ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        {showTasks && completedTasks.length > 0 && (
          <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
            {completedTasks.map((task) => (
              <div 
                key={task.id}
                className="text-xs p-2 border border-border rounded-md flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-eco-green/10 p-1.5 rounded-full">
                    <Package className="h-3 w-3 text-eco-green" />
                  </div>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-muted-foreground">{task.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-eco-green">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Award className="h-3 w-3" />
                    <span>{task.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {showTasks && completedTasks.length === 0 && (
          <div className="mt-3 text-center py-4 text-xs text-muted-foreground">
            No completed tasks yet.
            <p>Complete EcoDrop+ tasks to earn rewards!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EcoTab;
