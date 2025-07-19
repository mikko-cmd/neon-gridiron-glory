import { TabNavigation } from "@/components/TabNavigation";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useState } from "react";
import playerStatsImage from "@/assets/player-stats.jpg";

interface PlayerStatsPageProps {
  onNavigate: (page: string) => void;
}

const statsTabs = [
  { id: "overview", label: "Overview" },
  { id: "stats", label: "Stats" },
  { id: "gamelog", label: "Game Log" },
  { id: "history", label: "History" },
  { id: "news", label: "News" },
];

const playerStats = [
  { label: "Total TDs", value: "24", color: "text-neon-purple" },
  { label: "Total Yards", value: "3,847", color: "text-accent" },
  { label: "Attempts", value: "298", color: "text-secondary-foreground" },
  { label: "Rank", value: "#3", color: "text-neon-pink" },
];

export function PlayerStatsPage({ onNavigate }: PlayerStatsPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeNavTab, setActiveNavTab] = useState("stats");

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="fantasy-card m-4 mb-6">
        <TabNavigation
          tabs={statsTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-6"
        />
        
        {/* Player Hero Section */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <img
              src={playerStatsImage}
              alt="Player"
              className="w-32 h-32 rounded-2xl object-cover avatar-glow mx-auto"
            />
          </div>
          
          <div>
            <h1 className="text-2xl font-black text-foreground">Josh Allen</h1>
            <p className="text-secondary-foreground font-medium">QB • Buffalo Bills</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {playerStats.map((stat, index) => (
            <div key={index} className="fantasy-card text-center">
              <p className="text-secondary-foreground text-sm font-medium mb-1">
                {stat.label}
              </p>
              <p className={`text-2xl font-black ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Player Description */}
        <div className="fantasy-card">
          <h3 className="font-black text-foreground mb-3">About Player</h3>
          <p className="text-secondary-foreground leading-relaxed">
            Elite quarterback with exceptional arm strength and mobility. Consistently ranks among 
            the top fantasy performers with dual-threat capability. Strong red zone presence and 
            clutch performance in high-pressure situations.
          </p>
        </div>

        {/* Draft Button */}
        <button className="btn-neon-primary w-full mt-6">
          Draft Player
        </button>
      </div>

      <BottomNavigation 
        activeTab={activeNavTab} 
        onTabChange={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'home') onNavigate('landing');
          if (tab === 'players') onNavigate('players');
        }} 
      />
    </div>
  );
}