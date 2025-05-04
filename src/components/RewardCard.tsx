
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

interface RewardCardProps {
  name: string;
  description: string;
  cost: number;
  image?: string;
  isAvailable?: boolean;
  isPartner?: boolean;
  className?: string;
}

const RewardCard = ({
  name,
  description,
  cost,
  image,
  isAvailable = true,
  isPartner = false,
  className,
}: RewardCardProps) => {
  return (
    <Card className={cn("overflow-hidden", !isAvailable && "opacity-70", className)}>
      <div className="relative h-32 bg-muted overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-eco-green to-eco-blue text-white">
            {name.substring(0, 1)}
          </div>
        )}
        
        {!isAvailable && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="outline" className="bg-background/50">Coming Soon</Badge>
          </div>
        )}
        
        {isPartner && (
          <Badge className="absolute top-2 right-2 bg-eco-yellow text-primary">Partner</Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium">{name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        <div className="flex items-center gap-1 text-sm">
          <Coins className="h-4 w-4" />
          <span>{cost} ecoCoins</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardCard;
