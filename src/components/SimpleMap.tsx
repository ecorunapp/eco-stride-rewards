
import React from "react";
import { MapPin } from "lucide-react";

interface SimpleMapProps {
  destination: string;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ destination }) => {
  return (
    <div className="relative w-full h-48 bg-muted/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/55.2708,25.2048,12,0/400x200?access_token=pk.eyJ1IjoibG92YWJsZW1hcCIsImEiOiJjbHdrMGM1anowMGhwMmxsZ2k1dzBmMjhuIn0.8pUDpGTnZkakiMAA0oPiRg')] bg-cover bg-center opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <MapPin className="h-8 w-8 text-eco-green animate-bounce" />
          <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <p className="text-sm font-medium">{destination}</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
        Demo Map
      </div>
    </div>
  );
};

export default SimpleMap;
