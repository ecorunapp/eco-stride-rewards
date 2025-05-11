
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpFromLine, Bike, Car } from "lucide-react";
import ElectricWheelchair from "@/components/icons/ElectricWheelchair";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface RentalOption {
  type: "ev_bike" | "car" | "wheelchair";
  name: string;
  store: string;
  rate: string;
  image: string;
}

const MoveMatePage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOption, setSelectedOption] = useState<RentalOption | null>(null);

  const rentalOptions: RentalOption[] = [
    {
      type: "ev_bike", 
      name: "EcoRider X1",
      store: "GreenWheel Rentals",
      rate: "$15/hour or $49/day",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=400&fit=crop"
    },
    {
      type: "ev_bike", 
      name: "UrbanGlide E-Bike",
      store: "CityMover Co.",
      rate: "$12/hour or $45/day",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop"
    },
    {
      type: "car", 
      name: "Tesla Model 3",
      store: "EcoRide Autos",
      rate: "$25/hour or $89/day",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop"
    },
    {
      type: "car", 
      name: "Nissan Leaf",
      store: "GreenDrive",
      rate: "$18/hour or $75/day",
      image: "https://images.unsplash.com/photo-1593055497406-2f8c5dbec25b?w=600&h=400&fit=crop"
    },
    {
      type: "wheelchair", 
      name: "FreedomGlide E-Chair",
      store: "MobilityPlus",
      rate: "$10/hour or $35/day",
      image: "https://images.unsplash.com/photo-1593789196738-ac651d204a1b?w=600&h=400&fit=crop"
    },
    {
      type: "wheelchair", 
      name: "AccessRover Pro",
      store: "AccessWheels",
      rate: "$12/hour or $40/day",
      image: "https://images.unsplash.com/photo-1534709153997-d6659469f951?w=600&h=400&fit=crop"
    }
  ];

  const handleOpenDetails = (option: RentalOption) => {
    setSelectedOption(option);
    setShowDetails(true);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "ev_bike":
        return <Bike className="h-6 w-6 text-eco-blue" />;
      case "car":
        return <Car className="h-6 w-6 text-eco-blue" />;
      case "wheelchair":
        return <ElectricWheelchair className="h-6 w-6 text-eco-blue" />;
      default:
        return <Bike className="h-6 w-6 text-eco-blue" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">MoveMate+</h1>
        <p className="text-sm text-muted-foreground">Smart mobility rentals</p>
      </header>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-eco-blue/20 p-3 rounded-full">
              <ArrowUpFromLine className="h-6 w-6 text-eco-blue" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Eco-Friendly Mobility</h2>
              <p className="text-sm text-muted-foreground">Rent smart devices for your journey</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {rentalOptions.map((option, index) => (
              <div 
                key={index} 
                className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer"
                onClick={() => handleOpenDetails(option)}
              >
                <div className="h-40 w-full bg-muted overflow-hidden">
                  <img 
                    src={option.image} 
                    alt={option.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-eco-blue/10 p-1.5 rounded-full">
                      {getIcon(option.type)}
                    </div>
                    <h3 className="font-medium">{option.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{option.store}</p>
                  <p className="text-sm font-medium text-eco-blue">{option.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedOption?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedOption && (
            <div className="space-y-4">
              <div className="h-48 w-full overflow-hidden rounded-md">
                <img 
                  src={selectedOption.image} 
                  alt={selectedOption.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-eco-blue/10 p-1.5 rounded-full">
                    {getIcon(selectedOption.type)}
                  </div>
                  <h3 className="font-medium">{selectedOption.name}</h3>
                </div>
                <p><span className="font-medium">Provider:</span> {selectedOption.store}</p>
                <p><span className="font-medium">Rates:</span> {selectedOption.rate}</p>
                <p className="text-sm text-muted-foreground">
                  All rentals include helmet, locks, and basic insurance. 
                  Delivery available within 2 miles of store location.
                </p>
              </div>
              
              <div className="flex gap-3 pt-3">
                <Button 
                  className="flex-1 bg-eco-blue hover:bg-eco-blue/90"
                  onClick={() => setShowDetails(false)}
                >
                  Reserve Now
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowDetails(false)}
                >
                  View Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoveMatePage;
