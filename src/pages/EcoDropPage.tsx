import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Clock, Award, ChevronRight, Filter, Calendar, User, Check } from "lucide-react";
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
import DropTypeSelector from "@/components/DropTypeSelector";

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
}

const TaskCard = ({ task, onClick }: { task: Task; onClick: () => void }) => (
  <Card 
    className="w-full mb-3 hover:shadow-md transition-shadow duration-300 cursor-pointer border-border bg-background/80 backdrop-blur-sm"
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-eco-green/10 p-3 rounded-full">
            <Package className="h-5 w-5 text-eco-green" />
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

const EcoDropPage = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isNearbyTasksOpen, setIsNearbyTasksOpen] = useState(false);
  const [showMethodSelector, setShowMethodSelector] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(true);
  const { addCompletedTask } = useUserData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleTypeSelect = (type: "accessdrop" | "ecodrop") => {
    if (type === "accessdrop") {
      navigate("/accessdrop", { state: { fromSelection: true } });
    } else {
      // Stay on this page but hide the type selector
      setShowTypeSelector(false);
    }
  };

  // Mock task data
  const availableTasks: Task[] = [
    {
      id: 1,
      title: "Deliver eco-friendly package",
      location: "Green Market, UAE",
      distance: "1.2 km",
      timeEstimate: "15-20 min",
      reward: "50 ecoCoins",
      rewardPoints: 50,
      postedBy: "EcoStore Dubai",
      description: "Pick up an organic food package from Green Market and deliver it to a customer nearby. Package contains perishable items, so prompt delivery is essential.",
      date: "May 10, 2025"
    },
    {
      id: 2,
      title: "Pickup recycled materials",
      location: "Community Center, UAE",
      distance: "0.8 km",
      timeEstimate: "10-15 min",
      reward: "35 ecoCoins",
      rewardPoints: 35,
      postedBy: "UAE Recycles",
      description: "Collect sorted recyclable materials from the Community Center and transport them to the recycling facility. Materials include paper, plastics, and glass.",
      date: "May 10, 2025"
    },
    {
      id: 3,
      title: "Distribute flyers for tree planting",
      location: "City Park, UAE",
      distance: "2.1 km",
      timeEstimate: "25-30 min",
      reward: "60 ecoCoins",
      rewardPoints: 60,
      postedBy: "Green UAE Initiative",
      description: "Hand out information flyers about the upcoming tree planting event at City Park. Target local businesses and residents in the surrounding area.",
      date: "May 10, 2025"
    }
  ];

  const activeTasks: Task[] = [
    {
      id: 4,
      title: "Collect compostable waste",
      location: "Local Farm, UAE",
      distance: "1.5 km",
      timeEstimate: "15 min left",
      reward: "45 ecoCoins",
      rewardPoints: 45,
      postedBy: "Organic Farms UAE",
      status: "active",
      description: "Collect food waste from local restaurants to be used as compost at Organic Farms. The compost will be used to grow organic vegetables.",
      date: "May 10, 2025"
    }
  ];

  const completedTasks: Task[] = [
    {
      id: 5,
      title: "Delivered organic groceries",
      location: "Riverside Apartments, UAE",
      distance: "1.7 km",
      timeEstimate: "Completed",
      reward: "55 ecoCoins (earned)",
      rewardPoints: 55,
      postedBy: "Organic Grocer UAE",
      status: "completed",
      description: "Successfully delivered fresh organic produce to customers at Riverside Apartments. All items were delivered in eco-friendly packaging.",
      date: "May 9, 2025"
    },
    {
      id: 6,
      title: "Collected recyclable electronics",
      location: "Tech Recycling Center, UAE",
      distance: "3.2 km",
      timeEstimate: "Completed",
      reward: "80 ecoCoins (earned)",
      rewardPoints: 80,
      postedBy: "E-Waste UAE",
      status: "completed",
      description: "Collected old electronics from residential areas and delivered them to the Tech Recycling Center for proper disposal and recycling.",
      date: "May 8, 2025"
    }
  ];

  // Nearby tasks (for the "Find Tasks Near Me" sheet)
  const nearbyTasks: Task[] = [
    {
      id: 7,
      title: "Eco-friendly delivery",
      location: "Marina Mall, UAE",
      distance: "0.3 km",
      timeEstimate: "5-10 min",
      reward: "25 ecoCoins",
      rewardPoints: 25,
      postedBy: "Green Deliveries UAE",
      description: "Deliver a small eco-friendly package from Marina Mall to a nearby office building. The package contains sustainable office supplies.",
      date: "May 10, 2025"
    },
    {
      id: 8,
      title: "Beach cleanup volunteer",
      location: "Jumeirah Beach, UAE",
      distance: "0.5 km",
      timeEstimate: "30-45 min",
      reward: "70 ecoCoins",
      rewardPoints: 70,
      postedBy: "Clean Beaches UAE",
      description: "Join a beach cleanup effort at Jumeirah Beach. Equipment provided. Help collect plastic waste and other debris to keep our beaches clean.",
      date: "May 10, 2025"
    },
    {
      id: 9,
      title: "Water bottle refill station setup",
      location: "Downtown Area, UAE",
      distance: "0.7 km",
      timeEstimate: "15-20 min",
      reward: "40 ecoCoins",
      rewardPoints: 40,
      postedBy: "Hydrate UAE",
      description: "Help set up a temporary water bottle refill station in the downtown area to promote reusable water bottles and reduce plastic waste.",
      date: "May 10, 2025"
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

  // If we're waiting for the redirect, return null
  if (!location.state?.fromSelection) return null;

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      {showTypeSelector ? (
        <DropTypeSelector onSelect={handleTypeSelect} />
      ) : (
        <>
          <header className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary mb-1">EcoDrop+</h1>
              <p className="text-sm text-muted-foreground">Complete eco-tasks for rewards</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1 bg-eco-green/10 text-eco-green border-eco-green/20">
              <Award className="h-3.5 w-3.5" /> 
              Eco Champion
            </Badge>
          </header>
          
          <Card className="mb-6 border-border bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Task Board</span>
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
              className="w-full max-w-xs" 
              size="lg"
              onClick={handleFindTasksNearMe}
            >
              Find Tasks Near Me
            </Button>
          </div>

          {/* Task Details Dialog */}
          <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{selectedTask?.title}</DialogTitle>
                <DialogDescription>
                  Task details and information
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
                                  selectedTask.status === "accepted" ? "bg-eco-blue hover:bg-eco-blue/90" : ""}
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
                <SheetTitle>Tasks Near You</SheetTitle>
                <SheetDescription>
                  Based on your current location in UAE
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
        </>
      )}
    </div>
  );
};

export default EcoDropPage;
