import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Clock, UserRound, MessageCircle, Bell, Check, X, UserCheck, UserX, User } from "lucide-react";
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

interface Connection {
  id: number;
  user: {
    id: number;
    name: string;
    avatar?: string;
    location: string;
  };
  status: "pending" | "accepted" | "rejected" | "sent";
  date: string;
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

const ConnectionCard: React.FC<{
  connection: Connection;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
}> = ({ connection, onAccept, onReject }) => {
  return (
    <div className="p-4 border border-border rounded-lg mb-4 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={connection.user.avatar} alt={connection.user.name} />
          <AvatarFallback>{connection.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{connection.user.name}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{connection.user.location}</span>
          </div>
        </div>
        
        {connection.status === "pending" && (
          <div className="ml-auto flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className="h-8 px-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/20"
              onClick={() => onAccept && onAccept(connection.id)}
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 px-2 bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/20"
              onClick={() => onReject && onReject(connection.id)}
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )}
        
        {connection.status === "accepted" && (
          <Badge variant="outline" className="ml-auto bg-green-500/10 text-green-500">
            <UserCheck className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )}
        
        {connection.status === "rejected" && (
          <Badge variant="outline" className="ml-auto bg-destructive/10 text-destructive">
            <UserX className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )}
        
        {connection.status === "sent" && (
          <Badge variant="outline" className="ml-auto bg-amber-500/10 text-amber-500">
            <Bell className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )}
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground">
        {connection.date}
      </div>
    </div>
  );
};

const MeetFlarePage = () => {
  const [activeTab, setActiveTab] = useState("runners");
  const [selectedRunner, setSelectedRunner] = useState<RunnerProfile | null>(null);
  const [showRunnerProfile, setShowRunnerProfile] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: 1,
      user: {
        id: 101,
        name: "Laila R.",
        avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Laila",
        location: "Dubai Marina"
      },
      status: "pending",
      date: "Today, 10:30 AM"
    },
    {
      id: 2,
      user: {
        id: 102,
        name: "Omar J.",
        avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Omar",
        location: "JBR"
      },
      status: "accepted",
      date: "Yesterday, 3:15 PM"
    },
    {
      id: 3,
      user: {
        id: 103,
        name: "Maya K.",
        avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Maya",
        location: "Downtown Dubai"
      },
      status: "rejected",
      date: "May 10, 2:45 PM"
    },
    {
      id: 4,
      user: {
        id: 104,
        name: "Faisal H.",
        avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Faisal",
        location: "Business Bay"
      },
      status: "sent",
      date: "May 9, 9:20 AM"
    }
  ]);
  
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
    
    // Add to connections with "sent" status
    const newConnection: Connection = {
      id: Date.now(),
      user: {
        id: selectedRunner.id,
        name: selectedRunner.name,
        avatar: selectedRunner.avatar,
        location: selectedRunner.location
      },
      status: "sent",
      date: "Just now"
    };
    
    setConnections(prev => [...prev, newConnection]);
    
    // Show a confirmation toast
    toast({
      title: "Request Sent!",
      description: `You've sent a running buddy request to ${selectedRunner.name}`,
      duration: 5000
    });
  };
  
  const handleAcceptConnection = (id: number) => {
    setConnections(prev => prev.map(conn => 
      conn.id === id ? {...conn, status: "accepted"} : conn
    ));
    
    toast({
      title: "Connection Accepted",
      description: "You are now connected",
      duration: 3000
    });
  };
  
  const handleRejectConnection = (id: number) => {
    setConnections(prev => prev.map(conn => 
      conn.id === id ? {...conn, status: "rejected"} : conn
    ));
    
    toast({
      title: "Connection Rejected",
      description: "The request has been declined",
      duration: 3000
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
  
  // Filter connections by status
  const pendingConnections = connections.filter(conn => conn.status === "pending");
  const acceptedConnections = connections.filter(conn => conn.status === "accepted");
  const rejectedConnections = connections.filter(conn => conn.status === "rejected");
  const sentConnections = connections.filter(conn => conn.status === "sent");

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">MeetFlare</h1>
        <p className="text-sm text-muted-foreground">Find running partners near you</p>
      </header>
      
      <Tabs defaultValue="runners" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="runners">Find Partners</TabsTrigger>
          <TabsTrigger value="connections">My Connections</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeTab === "runners" ? (
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
            
            <Tabs defaultValue="runners" value={activeTab === "runners" ? "runners" : "walkers"} onValueChange={(value) => setActiveTab(value)}>
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
      ) : (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-eco-blue/20 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-eco-blue" />
              </div>
              <div>
                <h2 className="text-lg font-medium">My Connections</h2>
                <p className="text-sm text-muted-foreground">Manage your running partner connections</p>
              </div>
            </div>
            
            <Tabs defaultValue="pending">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="pending" className="text-xs">
                  Requests {pendingConnections.length > 0 && <span className="ml-1 bg-primary rounded-full h-5 w-5 inline-flex items-center justify-center text-[10px] text-white">{pendingConnections.length}</span>}
                </TabsTrigger>
                <TabsTrigger value="accepted" className="text-xs">Connected</TabsTrigger>
                <TabsTrigger value="sent" className="text-xs">Sent</TabsTrigger>
                <TabsTrigger value="rejected" className="text-xs">Declined</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="max-h-[60vh] overflow-y-auto">
                {pendingConnections.length > 0 ? (
                  pendingConnections.map(conn => (
                    <ConnectionCard 
                      key={conn.id} 
                      connection={conn} 
                      onAccept={handleAcceptConnection}
                      onReject={handleRejectConnection}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No pending requests</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="accepted" className="max-h-[60vh] overflow-y-auto">
                {acceptedConnections.length > 0 ? (
                  acceptedConnections.map(conn => (
                    <ConnectionCard key={conn.id} connection={conn} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserCheck className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No connections yet</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="sent" className="max-h-[60vh] overflow-y-auto">
                {sentConnections.length > 0 ? (
                  sentConnections.map(conn => (
                    <ConnectionCard key={conn.id} connection={conn} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No sent requests</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="rejected" className="max-h-[60vh] overflow-y-auto">
                {rejectedConnections.length > 0 ? (
                  rejectedConnections.map(conn => (
                    <ConnectionCard key={conn.id} connection={conn} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserX className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No declined requests</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
      
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
