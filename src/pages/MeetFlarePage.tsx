
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Clock, UserRound, MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import SimpleMap from "@/components/SimpleMap";

interface RunnerProfile {
  id: number;
  name: string;
  avatar?: string;
  location: string;
  distance: string;
  pace: string;
  status: "available" | "busy";
  interests: string[];
  bio?: string;
  requestSent?: boolean;
}

const RunnerCard: React.FC<{
  runner: RunnerProfile;
  onViewProfile: (runner: RunnerProfile) => void;
}> = ({ runner, onViewProfile }) => {
  return (
    <div 
      className="p-4 border border-border rounded-lg mb-4 hover:border-primary/30 hover:bg-muted/20 transition-colors cursor-pointer"
      onClick={() => onViewProfile(runner)}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={runner.avatar} alt={runner.name} />
          <AvatarFallback>{runner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{runner.name}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{runner.distance} away</span>
          </div>
        </div>
        <Badge variant="outline" className={`ml-auto ${runner.status === 'available' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
          {runner.status === 'available' ? 'Available' : 'Busy'}
        </Badge>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span>Pace: {runner.pace}/km</span>
        </div>
        <div className="flex flex-wrap gap-1 justify-end">
          {runner.interests.slice(0, 2).map((interest, i) => (
            <Badge variant="secondary" key={i} className="text-xs">
              {interest}
            </Badge>
          ))}
          {runner.interests.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{runner.interests.length - 2}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

const MeetFlarePage = () => {
  const [activeTab, setActiveTab] = useState("runners");
  const [selectedRunner, setSelectedRunner] = useState<RunnerProfile | null>(null);
  const [showRunnerProfile, setShowRunnerProfile] = useState(false);
  const { toast } = useToast();

  const handleViewProfile = (runner: RunnerProfile) => {
    setSelectedRunner(runner);
    setShowRunnerProfile(true);
  };

  const handleSendRequest = () => {
    if (!selectedRunner) return;
    
    // Update the runner to mark the request as sent
    setSelectedRunner({
      ...selectedRunner,
      requestSent: true
    });
    
    // Show a confirmation toast
    toast({
      title: "Request Sent!",
      description: `You've sent a running buddy request to ${selectedRunner.name}`,
      duration: 5000
    });
  };

  // Mock data for nearby runners
  const runners: RunnerProfile[] = [
    {
      id: 1,
      name: "Ahmed K.",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Ahmed",
      location: "Downtown Dubai",
      distance: "0.8 km",
      pace: "5:30 min",
      status: "available",
      interests: ["Morning Runs", "Marathon Training", "Trails"],
      bio: "Marathon runner training for Dubai Marathon. I love early morning runs and meeting new running partners!"
    },
    {
      id: 2,
      name: "Sara M.",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Sara",
      location: "Jumeirah Beach",
      distance: "1.5 km",
      pace: "6:15 min",
      status: "available",
      interests: ["Beach Running", "10K", "Evening Runs"],
      bio: "Casual runner who enjoys beach routes and sunset runs. Looking for running buddies to keep motivated!"
    },
    {
      id: 3,
      name: "Michael R.",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Michael",
      location: "Business Bay",
      distance: "2.2 km",
      pace: "5:10 min",
      status: "busy",
      interests: ["Speed Training", "City Routes", "Marathons"],
      bio: "Professional runner with 5+ marathons completed. Happy to share training tips and routes around the city."
    }
  ];

  // Mock data for nearby walkers
  const walkers: RunnerProfile[] = [
    {
      id: 4,
      name: "Layla T.",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Layla",
      location: "Dubai Marina",
      distance: "0.6 km",
      pace: "12:30 min",
      status: "available",
      interests: ["Casual Walks", "Photography", "Nature"],
      bio: "Enjoy leisurely walks while taking photos. Looking for walking companions to explore the city."
    },
    {
      id: 5,
      name: "Rajan P.",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Rajan",
      location: "JLT",
      distance: "1.8 km",
      pace: "11:45 min",
      status: "available",
      interests: ["Power Walking", "Fitness", "Morning Walks"],
      bio: "Fitness enthusiast who prefers power walks over running. Early riser looking for morning walking partners."
    }
  ];

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">MeetFlare</h1>
        <p className="text-sm text-muted-foreground">Find running partners near you</p>
      </header>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-eco-blue/20 p-3 rounded-full">
              <Users className="h-6 w-6 text-eco-blue" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Find Your Activity Partner</h2>
              <p className="text-sm text-muted-foreground">Match with people who share your pace and interests</p>
            </div>
          </div>
          
          <Tabs defaultValue="runners" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="runners">Runners</TabsTrigger>
              <TabsTrigger value="walkers">Walkers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="runners" className="max-h-[60vh] overflow-y-auto">
              <h3 className="text-sm font-medium mb-3">Nearby Runners</h3>
              {runners.map(runner => (
                <RunnerCard 
                  key={runner.id} 
                  runner={runner} 
                  onViewProfile={handleViewProfile}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="walkers" className="max-h-[60vh] overflow-y-auto">
              <h3 className="text-sm font-medium mb-3">Nearby Walkers</h3>
              {walkers.map(walker => (
                <RunnerCard 
                  key={walker.id} 
                  runner={walker} 
                  onViewProfile={handleViewProfile}
                />
              ))}
            </TabsContent>
          </Tabs>
          
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Find More Partners Nearby
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Runner Profile Dialog */}
      <Dialog open={showRunnerProfile} onOpenChange={setShowRunnerProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Runner Profile</DialogTitle>
            <DialogDescription>
              View details and connect
            </DialogDescription>
          </DialogHeader>
          
          {selectedRunner && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedRunner.avatar} alt={selectedRunner.name} />
                  <AvatarFallback>{selectedRunner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedRunner.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{selectedRunner.location} ({selectedRunner.distance} away)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-muted rounded-md">
                <div className="flex justify-between mb-2">
                  <div className="text-sm">
                    <span className="font-medium">Pace:</span> {selectedRunner.pace}/km
                  </div>
                  <Badge variant="outline" className={selectedRunner.status === 'available' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}>
                    {selectedRunner.status === 'available' ? 'Available Now' : 'Currently Busy'}
                  </Badge>
                </div>
                <p className="text-sm">{selectedRunner.bio}</p>
              </div>
              
              <SimpleMap destination={selectedRunner.location} />
              
              <div>
                <h4 className="text-sm font-medium mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRunner.interests.map((interest, i) => (
                    <Badge variant="secondary" key={i}>
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button 
                  className="flex-1 bg-eco-blue hover:bg-eco-blue/90"
                  onClick={handleSendRequest}
                  disabled={selectedRunner.requestSent}
                >
                  <UserRound className="mr-2 h-4 w-4" />
                  {selectedRunner.requestSent ? 'Request Sent' : 'Send Request'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetFlarePage;
