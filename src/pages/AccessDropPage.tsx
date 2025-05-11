import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, MapPin, Clock, Award, ChevronRight, Filter, Calendar, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useUserData } from "@/contexts/UserDataContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import SimpleMap from "@/components/SimpleMap";
import TransportMethodSelector, { TransportMethod } from "@/components/TransportMethodSelector";
import { useToast } from "@/hooks/use-toast";

// Task type definition
interface Task {
  id: number;
  title: string;
  location: string;
  distance: string;
  timeEstimate: string;
  reward: string;
  rewardPoints: number;
  postedBy?: string;
  status?: "available" | "active" | "completed" | "accepted";
  description?: string;
  date?: string;
  wheelchairAccessible: boolean;
}

const TaskCard = ({ task, onClick }: { task: Task; onClick: () => void }) => (
  <Card 
    className="w-full mb-3 hover:shadow-md transition-shadow duration-300 cursor-pointer border-border bg-background/80 backdrop-blur-sm"
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-eco-blue/10 p-3 rounded-full">
            <Accessibility className="h-5 w-5 text-eco-blue" />
          </div>
          <div>
            <h3 className="font-semibold text-base">{task.title}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-xs mt-1">
              <MapPin className="h-3 w-3" />
              <span>{task.location}</span>
              <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
              <span>{task.distance}</span>
            </div>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <Separator className="my-3" />
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{task.timeEstimate}</span>
        </div>
        <div className="flex items-center gap-1 text-primary font-medium">
          <Award className="h-3.5 w-3.5" />
          <span>{task.reward}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const AccessDropPage = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isNearbyTasksOpen, setIsNearbyTasksOpen] = useState(false);
  const [showMethodSelector, setShowMethodSelector] = useState(false);
  const { addCompletedTask } = useUserData();
  const { toast } = useToast();

  // Mock task data specifically for wheelchair users
  const availableTasks: Task[] = [
    {
      id: 101,
      title: "Deliver medication",
      location: "Accessibility Pharmacy, UAE",
      distance: "0.8 km",
      timeEstimate: "10-15 min",
      reward: "45 ecoCoins",
      rewardPoints: 45,
      postedBy: "AccessCare Services",
      description: "Pick up prescription medication from Accessibility Pharmacy and deliver it to a customer nearby. Route is fully wheelchair accessible with ramps.",
      date: "May 11, 2025",
      wheelchairAccessible: true
    },
    {
      id: 102,
      title: "Distribute accessibility guides",
      location: "Community Center, UAE",
      distance: "0.5 km",
      timeEstimate: "15-20 min",
      reward: "40 ecoCoins",
      rewardPoints: 40,
      postedBy: "UAE Accessibility Initiative",
      description: "Distribute accessibility guides to local businesses in the area. All locations have wheelchair access and friendly staff.",
      date: "May 11, 2025",
      wheelchairAccessible: true
    },
    {
      id: 103,
      title: "Collect surveys from senior center",
      location: "Golden Age Center, UAE",
      distance: "1.2 km",
      timeEstimate: "20-25 min",
      reward: "50 ecoCoins",
      rewardPoints: 50,
      postedBy: "AccessibilityNow UAE",
      description: "Collect completed accessibility surveys from the Golden Age Senior Center. The route is optimized for wheelchair users with all accessible paths.",
      date: "May 11, 2025",
      wheelchairAccessible: true
    }
  ];

  const activeTasks: Task[] = [];

  const completedTasks: Task[] = [
    {
      id: 104,
      title: "Delivered adaptive equipment",
      location: "Rehabilitation Center, UAE",
      distance: "0.9 km",
      timeEstimate: "Completed",
      reward: "55 ecoCoins (earned)",
      rewardPoints: 55,
      postedBy: "Adaptive Tech UAE",
      status: "completed",
      description: "Successfully delivered adaptive equipment to the Rehabilitation Center. The equipment will help people with mobility challenges.",
      date: "May 10, 2025",
      wheelchairAccessible: true
    }
  ];

  // Nearby tasks (for the "Find Tasks Near Me" sheet)
  const nearbyTasks: Task[] = [
    {
      id: 105,
      title: "Accessible product delivery",
      location: "Wellness Center, UAE",
      distance: "0.3 km",
      timeEstimate: "5-10 min",
      reward: "30 ecoCoins",
      rewardPoints: 30,
      postedBy: "Inclusive Services UAE",
      description: "Deliver adaptive wellness products from the Wellness Center to a customer nearby. The route is fully accessible and well-paved.",
      date: "May 11, 2025",
      wheelchairAccessible: true
    },
    {
      id: 106,
      title: "Collect feedback on ramp installation",
      location: "City Library, UAE",
      distance: "0.6 km",
      timeEstimate: "15-20 min",
      reward: "35 ecoCoins",
      rewardPoints: 35,
      postedBy: "AccessForAll UAE",
      description: "Visit the City Library to collect feedback on their newly installed accessibility ramps. Route is optimized for wheelchair users.",
      date: "May 11, 2025",
      wheelchairAccessible: true
    }
  ];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleClaimTask = () => {
    if (selectedTask) {
      if (selectedTask.status === "completed") {
        // If the task is already completed, add it to completed tasks list in UserDataContext
        addCompletedTask({
          id: selectedTask.id,
          title: selectedTask.title,
          reward: selectedTask.rewardPoints,
          date: selectedTask.date || new Date().toLocaleDateString()
        });
        setIsTaskDialogOpen(false);
      } else {
        // For available tasks, show the method selector
        setShowMethodSelector(true);
      }
    }
  };

  const handleMethodSelect = (method: TransportMethod) => {
    // Update the task status to accepted
    if (selectedTask) {
      setSelectedTask({
        ...selectedTask,
        status: "accepted"
      });
      
      // Show confirmation and close the method selector
      toast({
        title: "Task accepted!",
        description: `You'll be using ${method.replace('_', ' ')} for this task.`,
        duration: 5000,
      });
      
      setShowMethodSelector(false);
    }
  };

  const handleMethodCancel = () => {
    setShowMethodSelector(false);
  };

  const handleFindTasksNearMe = () => {
    setIsNearbyTasksOpen(true);
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-1">AccessDrop</h1>
          <p className="text-sm text-muted-foreground">Wheelchair-accessible tasks for rewards</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1 bg-eco-blue/10 text-eco-blue border-eco-blue/20">
          <Award className="h-3.5 w-3.5" /> 
          Accessibility Champion
        </Badge>
      </header>
      
      <Card className="mb-6 border-border bg-background/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Accessible Tasks</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Filter className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Tabs
            defaultValue="available" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="available" className="text-xs">
                Available
                <Badge variant="secondary" className="ml-1 h-5 bg-muted">{availableTasks.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="active" className="text-xs">
                Active
                <Badge variant="secondary" className="ml-1 h-5 bg-muted">{activeTasks.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs">
                Completed
                <Badge variant="secondary" className="ml-1 h-5 bg-muted">{completedTasks.length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="space-y-1 mt-0 max-h-[60vh] overflow-y-auto pb-2">
              {availableTasks.map(task => (
                <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />
              ))}
            </TabsContent>
            
            <TabsContent value="active" className="space-y-1 mt-0 max-h-[60vh] overflow-y-auto pb-2">
              {activeTasks.length > 0 ? (
                activeTasks.map(task => (
                  <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No active tasks</p>
                  <p className="text-sm mt-1">Accept a task to get started</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-1 mt-0 max-h-[60vh] overflow-y-auto pb-2">
              {completedTasks.map(task => (
                <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button 
          className="w-full max-w-xs bg-eco-blue hover:bg-eco-blue/90" 
          size="lg"
          onClick={handleFindTasksNearMe}
        >
          Find Accessible Tasks Near Me
        </Button>
      </div>

      {/* Task Details Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogDescription>
              Accessible task details
            </DialogDescription>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-4">
              {/* Show map for the task when task is accepted or being viewed */}
              {(showMethodSelector || selectedTask.status === "accepted") && (
                <SimpleMap destination={selectedTask.location} />
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{selectedTask.location}</span>
                <span className="text-xs text-muted-foreground">({selectedTask.distance})</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{selectedTask.timeEstimate}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Posted by: {selectedTask.postedBy}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{selectedTask.date}</span>
              </div>
              
              <div className="bg-muted p-3 rounded-md mt-2 text-sm">
                <p>{selectedTask.description}</p>
              </div>
              
              {/* Transportation Method Selector */}
              {showMethodSelector ? (
                <TransportMethodSelector 
                  onSelect={handleMethodSelect}
                  onCancel={handleMethodCancel}
                  defaultTab="wheelchair"
                />
              ) : (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1 text-primary font-medium">
                    <Award className="h-5 w-5" />
                    <span>{selectedTask.reward}</span>
                  </div>
                  
                  <Button 
                    onClick={handleClaimTask}
                    className={selectedTask.status === "completed" ? "bg-green-600 hover:bg-green-700" : 
                              selectedTask.status === "accepted" ? "bg-eco-blue hover:bg-eco-blue/90" : "bg-eco-blue hover:bg-eco-blue/90"}
                  >
                    {selectedTask.status === "completed" ? (
                      <>
                        <Check className="mr-1 h-4 w-4" />
                        Completed
                      </>
                    ) : selectedTask.status === "active" ? (
                      "Mark as Complete"
                    ) : selectedTask.status === "accepted" ? (
                      "Start Navigation"
                    ) : (
                      "Accept Task"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Nearby Tasks Sheet */}
      <Sheet open={isNearbyTasksOpen} onOpenChange={setIsNearbyTasksOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
          <SheetHeader className="text-left pb-2">
            <SheetTitle>Accessible Tasks Near You</SheetTitle>
            <SheetDescription>
              Wheelchair-accessible tasks in your area
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-4 pb-14 overflow-y-auto">
            {nearbyTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onClick={() => {
                  setSelectedTask(task);
                  setIsNearbyTasksOpen(false);
                  setIsTaskDialogOpen(true);
                }} 
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AccessDropPage;
