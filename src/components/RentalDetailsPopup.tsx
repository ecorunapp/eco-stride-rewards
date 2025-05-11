
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Truck, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RentalDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  vehicleType: string;
}

const RentalDetailsPopup: React.FC<RentalDetailsPopupProps> = ({
  open,
  onClose,
  onConfirm,
  vehicleType
}) => {
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("pickup");
  const [rentDays, setRentDays] = useState(1);
  const { toast } = useToast();

  const pricePerDay = vehicleType === "ev_scooter" ? 25 : vehicleType === "ev_vehicles" ? 55 : 15;
  const totalPrice = pricePerDay * rentDays;
  
  const handleConfirm = () => {
    toast({
      title: "Rental confirmed",
      description: `Your ${vehicleType.replace('_', ' ')} rental has been confirmed for ${rentDays} day${rentDays > 1 ? 's' : ''}.`,
    });
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rental Details</DialogTitle>
          <DialogDescription>
            Configure your {vehicleType.replace('_', ' ')} rental
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center">
              <span className="text-lg font-semibold">{vehicleType.replace('_', ' ')}</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-medium text-primary">{pricePerDay} ecoCoins/day</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="rental-days">Rental Duration (days)</Label>
            <div className="flex items-center gap-3 mt-1">
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                onClick={() => setRentDays(Math.max(1, rentDays - 1))}
                disabled={rentDays <= 1}
              >
                -
              </Button>
              <Input 
                id="rental-days"
                type="number" 
                min="1" 
                max="30"
                value={rentDays}
                onChange={(e) => setRentDays(parseInt(e.target.value) || 1)}
                className="w-20 text-center"
              />
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                onClick={() => setRentDays(Math.min(30, rentDays + 1))}
                disabled={rentDays >= 30}
              >
                +
              </Button>
              
              <div className="flex items-center gap-1 ml-auto">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {rentDays} day{rentDays > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <h4 className="font-medium mb-2">Delivery Options</h4>
            <RadioGroup 
              value={deliveryOption} 
              onValueChange={(val) => setDeliveryOption(val as "pickup" | "delivery")}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Pickup from nearest hub
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border border-border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    Door delivery (+10 ecoCoins)
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="bg-muted p-3 rounded-md mt-4">
            <div className="flex justify-between items-center">
              <span>Base rental ({rentDays} day{rentDays > 1 ? 's' : ''})</span>
              <span>{pricePerDay * rentDays} ecoCoins</span>
            </div>
            
            {deliveryOption === "delivery" && (
              <div className="flex justify-between items-center mt-2">
                <span>Door delivery fee</span>
                <span>10 ecoCoins</span>
              </div>
            )}
            
            <div className="border-t mt-2 pt-2 flex justify-between items-center font-medium">
              <span>Total</span>
              <span className="text-primary">
                {totalPrice + (deliveryOption === "delivery" ? 10 : 0)} ecoCoins
              </span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} className="bg-eco-green hover:bg-eco-green/90">
            Confirm Rental
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RentalDetailsPopup;
