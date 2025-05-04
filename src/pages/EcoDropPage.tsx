
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, Clock, Award, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const TaskCard = ({ title, location, timeEstimate, reward, distance }) => (
  <Card className="w-full mb-3 hover:shadow-md transition-shadow duration-300 cursor-pointer border-border bg-background/80 backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-eco-green/10 p-3 rounded-full">
            <Package className="h-5 w-5 text-eco-green" />
          </div>
          <div>
            <h3 className="font-semibold text-base">{title}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-xs mt-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
              <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
              <span>{distance}</span>
            </div>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <Separator className="my-3" />
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{timeEstimate}</span>
        </div>
        <div className="flex items-center gap-1 text-primary font-medium">
          <Award className="h-3.5 w-3.5" />
          <span>{reward}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const EcoDropPage = () => {
  const [activeTab, setActiveTab] = useState("available");

  // Mock task data
  const availableTasks = [
    {
      id: 1,
      title: "Deliver eco-friendly package",
      location: "Green Market",
      distance: "1.2 km",
      timeEstimate: "15-20 min",
      reward: "50 ecoCoins"
    },
    {
      id: 2,
      title: "Pickup recycled materials",
      location: "Community Center",
      distance: "0.8 km",
      timeEstimate: "10-15 min",
      reward: "35 ecoCoins"
    },
    {
      id: 3,
      title: "Distribute flyers for tree planting",
      location: "City Park",
      distance: "2.1 km",
      timeEstimate: "25-30 min",
      reward: "60 ecoCoins"
    }
  ];

  const activeTasks = [
    {
      id: 4,
      title: "Collect compostable waste",
      location: "Local Farm",
      distance: "1.5 km",
      timeEstimate: "15 min left",
      reward: "45 ecoCoins"
    }
  ];

  const completedTasks = [
    {
      id: 5,
      title: "Delivered organic groceries",
      location: "Riverside Apartments",
      distance: "1.7 km",
      timeEstimate: "Completed",
      reward: "55 ecoCoins (earned)"
    },
    {
      id: 6,
      title: "Collected recyclable electronics",
      location: "Tech Recycling Center",
      distance: "3.2 km",
      timeEstimate: "Completed",
      reward: "80 ecoCoins (earned)"
    }
  ];

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
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
                <TaskCard key={task.id} {...task} />
              ))}
            </TabsContent>
            
            <TabsContent value="active" className="space-y-1 mt-0 max-h-[60vh] overflow-y-auto pb-2">
              {activeTasks.length > 0 ? (
                activeTasks.map(task => (
                  <TaskCard key={task.id} {...task} />
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
                <TaskCard key={task.id} {...task} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button className="w-full max-w-xs" size="lg">
          Find Tasks Near Me
        </Button>
      </div>
    </div>
  );
};

export default EcoDropPage;
