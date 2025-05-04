
import React from "react";
import { useUserData } from "@/contexts/UserDataContext";
import EcoTab from "@/components/EcoTab";
import RewardCard from "@/components/RewardCard";

const WalletPage = () => {
  const { totalCoins } = useUserData();
  
  // Sample rewards data
  const rewards = [
    {
      id: 1,
      name: "Tree Planting",
      description: "Fund planting a tree in a reforestation project",
      cost: 500,
      isAvailable: true,
    },
    {
      id: 2,
      name: "Reusable Water Bottle",
      description: "25% off eco-friendly water bottles",
      cost: 300,
      isPartner: true,
      isAvailable: true,
    },
    {
      id: 3,
      name: "Solar Power Bank",
      description: "50% discount on solar power bank",
      cost: 800,
      isPartner: true,
      isAvailable: true,
    },
    {
      id: 4,
      name: "EcoRun Premium",
      description: "1-month subscription to advanced features",
      cost: 1000,
      isAvailable: false,
    },
  ];
  
  // Partner store section
  const partners = [
    {
      id: 1,
      name: "Green Gear Co.",
      description: "Sustainable athletic wear discounts",
      cost: 250,
      isPartner: true,
      isAvailable: false,
    },
    {
      id: 2,
      name: "EcoTech",
      description: "Recycled tech accessories and gadgets",
      cost: 400,
      isPartner: true,
      isAvailable: false,
    },
  ];
  
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Wallet</h1>
        <p className="text-sm text-muted-foreground">Manage your ecoCoins and rewards</p>
      </header>
      
      <EcoTab coinBalance={totalCoins} className="mb-8" />
      
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Available Rewards</h2>
        <div className="grid grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              name={reward.name}
              description={reward.description}
              cost={reward.cost}
              isAvailable={reward.isAvailable}
              isPartner={reward.isPartner}
            />
          ))}
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Partner Stores</h2>
          <span className="text-xs px-2 py-1 rounded-full bg-eco-yellow/20 text-eco-yellow">
            Coming Soon
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {partners.map((partner) => (
            <RewardCard
              key={partner.id}
              name={partner.name}
              description={partner.description}
              cost={partner.cost}
              isAvailable={partner.isAvailable}
              isPartner={partner.isPartner}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WalletPage;
