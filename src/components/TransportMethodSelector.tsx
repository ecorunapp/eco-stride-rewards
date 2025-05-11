
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bike, Car, PersonStanding, Move, Play, Calendar, CheckCircle } from "lucide-react";
import ElectricWheelchair from "@/components/icons/ElectricWheelchair";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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
  defaultTab?: "standard" | "wheelchair";
}

interface RentalOption {
  id: string;
  name: string;
  pricePerDay: number;
  deliveryOption: boolean;
  pickupOption: boolean;
  image: string;
  availability: string;
}

const TransportMethodSelector: React.FC<TransportMethodSelectorProps> = ({
  onSelect,
  onCancel,
  defaultTab = "standard"
}) => {
  const [selectedMethod, setSelectedMethod] = useState<TransportMethod | null>(null);
  const [showRentalDialog, setShowRentalDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"standard" | "wheelchair">(defaultTab);
  const [selectedRental, setSelectedRental] = useState<RentalOption | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup" | null>(null);

  // Mock rental options data
  const rentalOptions: RentalOption[] = [
    {
      id: "bike1",
      name: "City Cruiser E-Bike",
      pricePerDay: 45,
      deliveryOption: true,
      pickupOption: true,
      image: "https://placehold.co/100x100/e4e4e7/71717a?text=E-Bike",
      availability: "Available immediately"
    },
    {
      id: "scooter1",
      name: "Urban Explorer Scooter",
      pricePerDay: 35,
      deliveryOption: true,
      pickupOption: true,
      image: "https://placehold.co/100x100/e4e4e7/71717a?text=Scooter",
      availability: "Available in 30 min"
    },
    {
      id: "wheelchair1",
      name: "Power Assist Wheelchair",
      pricePerDay: 55,
      deliveryOption: true,
      pickupOption: false,
      image: "https://placehold.co/100x100/e4e4e7/71717a?text=Wheelchair",
      availability: "Available tomorrow"
    }
  ];

  const handleConfirm = () => {
    if (selectedMethod) {
      if (selectedMethod === "movemate_rentals" || selectedMethod === "ev_vehicles") {
        setShowRentalDialog(true);
      } else {
        onSelect(selectedMethod);
      }
    }
  };

  const handleRentalConfirm = () => {
    if (selectedMethod && deliveryMethod) {
      setShowRentalDialog(false);
      onSelect(selectedMethod);
    }
  };

  return (
    <div className="bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Choose transportation method</h3>
      
      <div className="mb-4">
        <div className="flex border rounded-md overflow-hidden">
          <button
            className={`flex-1 py-2 px-4 ${activeTab === "standard" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            onClick={() => setActiveTab("standard")}
          >
            Standard
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === "wheelchair" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            onClick={() => setActiveTab("wheelchair")}
          >
            Wheelchair
          </button>
        </div>
      </div>
      
      <RadioGroup 
        value={selectedMethod || ""} 
        onValueChange={(value) => setSelectedMethod(value as TransportMethod)}
        className="space-y-3"
      >
        {activeTab === "standard" && (
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

        {activeTab === "wheelchair" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="wheelchair" id="wheelchair" />
              <Label htmlFor="wheelchair" className="flex items-center gap-2 cursor-pointer">
                <span className="bg-eco-green/10 p-1.5 rounded-full">
                  <ElectricWheelchair className="h-4 w-4 text-eco-green" />
                </span>
                Wheelchair
              </Label>
            </div>
            
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
        )}

        <div className="mt-2 border-t border-border pt-3">
          <h4 className="text-sm font-medium mb-2">MoveMate+ Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            className="w-full bg-eco-green hover:bg-eco-green/90 mt-2"
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
            className="bg-eco-green hover:bg-eco-green/90"
          >
            Confirm
          </Button>
        )}
      </div>

      {/* Rental Options Dialog */}
      <Dialog open={showRentalDialog} onOpenChange={setShowRentalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose a Rental Option</DialogTitle>
            <DialogDescription>
              Select a vehicle and delivery method for your task
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-4">
              {rentalOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedRental?.id === option.id 
                      ? 'border-eco-blue bg-eco-blue/5' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedRental(option)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden">
                      <img src={option.image} alt={option.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{option.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">{option.availability}</span>
                        <Badge variant="outline" className="bg-eco-blue/10 text-eco-blue border-eco-blue/20">
                          {option.pricePerDay} AED/day
                        </Badge>
                      </div>
                    </div>
                    {selectedRental?.id === option.id && (
                      <CheckCircle className="h-5 w-5 text-eco-blue" />
                    )}
                  </div>
                </div>
              ))}

              {selectedRental && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Delivery Options</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedRental.deliveryOption && (
                      <button
                        className={`p-3 border rounded-lg flex flex-col items-center justify-center ${
                          deliveryMethod === 'delivery' 
                            ? 'border-eco-blue bg-eco-blue/5' 
                            : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => setDeliveryMethod('delivery')}
                      >
                        <Calendar className="h-5 w-5 mb-1" />
                        <span className="text-sm font-medium">Door Delivery</span>
                        <span className="text-xs text-muted-foreground">Within 2 hours</span>
                      </button>
                    )}
                    
                    {selectedRental.pickupOption && (
                      <button
                        className={`p-3 border rounded-lg flex flex-col items-center justify-center ${
                          deliveryMethod === 'pickup' 
                            ? 'border-eco-blue bg-eco-blue/5' 
                            : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => setDeliveryMethod('pickup')}
                      >
                        <PersonStanding className="h-5 w-5 mb-1" />
                        <span className="text-sm font-medium">Pickup</span>
                        <span className="text-xs text-muted-foreground">Available now</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowRentalDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleRentalConfirm} 
                disabled={!selectedRental || !deliveryMethod}
                className="bg-eco-blue hover:bg-eco-blue/90"
              >
                Confirm Rental
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransportMethodSelector;
