
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Accessibility } from "lucide-react";

interface DropTypeSelectorProps {
  onSelect: (type: "ecodrop" | "accessdrop") => void;
}

const DropTypeSelector: React.FC<DropTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">Select Task Type</h2>
      
      <Card 
        className="cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect("ecodrop")}
      >
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-eco-green/10 p-3 rounded-full">
            <Package className="h-6 w-6 text-eco-green" />
          </div>
          <div>
            <h3 className="font-medium">EcoDrop</h3>
            <p className="text-sm text-muted-foreground">Standard eco-friendly delivery tasks</p>
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className="cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect("accessdrop")}
      >
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-eco-blue/10 p-3 rounded-full">
            <Accessibility className="h-6 w-6 text-eco-blue" />
          </div>
          <div>
            <h3 className="font-medium">AccessDrop</h3>
            <p className="text-sm text-muted-foreground">Wheelchair-accessible routes and tasks</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DropTypeSelector;
