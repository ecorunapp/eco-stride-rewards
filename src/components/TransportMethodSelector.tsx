
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bike, Car, PersonStanding, Move, Play, Accessibility } from "lucide-react";
import ElectricWheelchair from "@/components/icons/ElectricWheelchair";

export type TransportMethod = 
  | "run" 
  | "ev_scooter" 
  | "walk" 
  | "wheelchair" 
  | "movemate_rentals" 
  | "ev_vehicles" 
  | "electric_wheelchair";

interface TransportMethodSelectorProps {
  onSelect: (method: TransportMethod) => void;
  onCancel: () => void;
  accessibleOnly?: boolean;
}

const TransportMethodSelector: React.FC<TransportMethodSelectorProps> = ({
  onSelect,
  onCancel,
  accessibleOnly = false
}) => {
  const [selectedMethod, setSelectedMethod] = React.useState<TransportMethod | null>(null);

  const handleConfirm = () => {
    if (selectedMethod) {
      onSelect(selectedMethod);
    }
  };

  return (
    <div className="bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Choose transportation method</h3>
      
      <RadioGroup 
        value={selectedMethod || ""} 
        onValueChange={(value) => setSelectedMethod(value as TransportMethod)}
        className="space-y-3"
      >
        {!accessibleOnly && (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="run" id="run" />
              <Label htmlFor="run" className="flex items-center gap-2 cursor-pointer">
                <span className="bg-eco-green/10 p-1.5 rounded-full">
                  <PersonStanding className="h-4 w-4 text-eco-green" />
                </span>
                Run
              </Label>
            </div>

            <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="ev_scooter" id="ev_scooter" />
              <Label htmlFor="ev_scooter" className="flex items-center gap-2 cursor-pointer">
                <span className="bg-eco-green/10 p-1.5 rounded-full">
                  <Bike className="h-4 w-4 text-eco-green" />
                </span>
                EV Scooter
              </Label>
            </div>

            <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="walk" id="walk" />
              <Label htmlFor="walk" className="flex items-center gap-2 cursor-pointer">
                <span className="bg-eco-green/10 p-1.5 rounded-full">
                  <PersonStanding className="h-4 w-4 text-eco-green" />
                </span>
                Walk
              </Label>
            </div>
          </div>
        )}

        {/* Wheelchair option - shown for both modes */}
        <div className={accessibleOnly ? "" : "border-t border-border pt-3"}>
          {!accessibleOnly && <h4 className="text-sm font-medium mb-2">Accessible Options</h4>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="wheelchair" id="wheelchair" />
              <Label htmlFor="wheelchair" className="flex items-center gap-2 cursor-pointer">
                <span className={`${accessibleOnly ? "bg-eco-blue/10" : "bg-eco-green/10"} p-1.5 rounded-full`}>
                  <Accessibility className={`h-4 w-4 ${accessibleOnly ? "text-eco-blue" : "text-eco-green"}`} />
                </span>
                Wheelchair
              </Label>
            </div>
          </div>
        </div>

        <div className="mt-2 border-t border-border pt-3">
          <h4 className="text-sm font-medium mb-2">MoveMate+ Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {!accessibleOnly && (
              <>
                <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="movemate_rentals" id="movemate_rentals" />
                  <Label htmlFor="movemate_rentals" className="flex items-center gap-2 cursor-pointer">
                    <span className="bg-eco-blue/10 p-1.5 rounded-full">
                      <Move className="h-4 w-4 text-eco-blue" />
                    </span>
                    MoveMate+ Rentals
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="ev_vehicles" id="ev_vehicles" />
                  <Label htmlFor="ev_vehicles" className="flex items-center gap-2 cursor-pointer">
                    <span className="bg-eco-blue/10 p-1.5 rounded-full">
                      <Car className="h-4 w-4 text-eco-blue" />
                    </span>
                    EV Vehicles
                  </Label>
                </div>
              </>
            )}

            <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="electric_wheelchair" id="electric_wheelchair" />
              <Label htmlFor="electric_wheelchair" className="flex items-center gap-2 cursor-pointer">
                <span className="bg-eco-blue/10 p-1.5 rounded-full">
                  <ElectricWheelchair className="h-4 w-4 text-eco-blue" />
                </span>
                Electric Wheelchair
              </Label>
            </div>
          </div>
        </div>
      </RadioGroup>

      {selectedMethod && (
        <div className="mt-4 p-3 border border-eco-green/30 bg-eco-green/5 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <Play className="h-4 w-4 text-eco-green" />
            <span className="font-medium">Ready to start</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            You've selected {selectedMethod.replace('_', ' ')} for this task.
          </p>
          <Button 
            onClick={handleConfirm}
            className={`w-full ${accessibleOnly ? "bg-eco-blue hover:bg-eco-blue/90" : "bg-eco-green hover:bg-eco-green/90"} mt-2`}
          >
            Start Task
          </Button>
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        {!selectedMethod && (
          <Button 
            onClick={handleConfirm}
            disabled={!selectedMethod}
            className={accessibleOnly ? "bg-eco-blue hover:bg-eco-blue/90" : "bg-eco-green hover:bg-eco-green/90"}
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
};

export default TransportMethodSelector;
