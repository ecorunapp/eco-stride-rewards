
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accessibility, Package } from "lucide-react";

type DropType = "accessdrop" | "ecodrop";

interface DropTypeSelectorProps {
  onSelect: (type: DropType) => void;
}

const DropTypeSelector: React.FC<DropTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">Select Service Type</h1>
      
      <div className="grid grid-cols-1 gap-4">
        <Card 
          className="hover:shadow-md transition-all duration-300 cursor-pointer border-eco-green/50"
          onClick={() => onSelect("accessdrop")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-eco-blue/10 p-3 rounded-full">
                <Accessibility className="h-6 w-6 text-eco-blue" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">AccessDrop</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Wheelchair-accessible routes and special tasks
                </p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-eco-blue hover:bg-eco-blue/90">Select</Button>
          </CardContent>
        </Card>
        
        <Card 
          className="hover:shadow-md transition-all duration-300 cursor-pointer border-eco-green/50"
          onClick={() => onSelect("ecodrop")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-eco-green/10 p-3 rounded-full">
                <Package className="h-6 w-6 text-eco-green" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">EcoDrop</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Standard eco-friendly delivery tasks
                </p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-eco-green hover:bg-eco-green/90">Select</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DropTypeSelector;
