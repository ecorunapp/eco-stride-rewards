
import React from "react";
import { useUserData } from "@/contexts/UserDataContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";
import { Award, Settings } from "lucide-react";

const ProfilePage = () => {
  const { steps, totalCoins } = useUserData();
  
  // Sample user data
  const user = {
    name: "Alex Green",
    level: 5,
    joinDate: "Jan 2025",
    badges: ["Early Adopter", "Step Master", "Tree Hugger"]
  };
  
  // Sample stats
  const stats = [
    { label: "Total Steps", value: steps },
    { label: "Total ecoCoins", value: totalCoins },
    { label: "Trees Planted", value: 0 },
    { label: "Challenges Won", value: 0 }
  ];
  
  // Future features list
  const futureFeatures = [
    "MeetFlare - Match & Run with others",
    "Runfluence - Creator system",
    "MoveMate+ - Smart rentals", 
    "Advanced Statistics"
  ];
  
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Profile</h1>
        <Settings className="h-5 w-5" />
      </header>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  Level {user.level}
                </span>
                <span className="text-xs text-muted-foreground">
                  Since {user.joinDate}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-semibold">{formatNumber(stat.value)}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-eco-yellow" />
          <h2 className="text-lg font-medium">Badges</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.badges.map((badge, index) => (
            <span 
              key={index} 
              className="text-xs px-3 py-1 bg-accent text-accent-foreground rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </section>
      
      <Separator className="my-6" />
      
      <section>
        <h2 className="text-lg font-medium mb-4">Coming Soon</h2>
        <div className="space-y-2">
          {futureFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="p-3 border border-dashed border-border rounded-lg text-sm text-muted-foreground"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
