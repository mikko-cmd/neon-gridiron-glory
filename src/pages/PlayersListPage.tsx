import { TabNavigation } from "@/components/TabNavigation";
import { PlayerCard } from "@/components/PlayerCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useState } from "react";
import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";

interface PlayersListPageProps {
  onNavigate: (page: string) => void;
}

const positionTabs = [
  { id: "all", label: "All" },
  { id: "qb", label: "QBs" },
  { id: "rb", label: "RBs" },
  { id: "wr", label: "WRs" },
  { id: "te", label: "TEs" },
  { id: "k", label: "K" },
  { id: "def", label: "DEF" },
];

const players = [
  { id: 1, name: "Derrick Henry", position: "RB", team: "Tennessee Titans", avatar: player1 },
  { id: 2, name: "Tyreek Hill", position: "WR", team: "Miami Dolphins", avatar: player2 },
  { id: 3, name: "Travis Kelce", position: "TE", team: "Kansas City Chiefs", avatar: player3 },
  { id: 4, name: "Christian McCaffrey", position: "RB", team: "San Francisco 49ers", avatar: player1 },
  { id: 5, name: "Cooper Kupp", position: "WR", team: "Los Angeles Rams", avatar: player2 },
  { id: 6, name: "Mark Andrews", position: "TE", team: "Baltimore Ravens", avatar: player3 },
];

export function PlayersListPage({ onNavigate }: PlayersListPageProps) {
  const [activePosition, setActivePosition] = useState("all");
  const [activeNavTab, setActiveNavTab] = useState("players");

  const filteredPlayers = activePosition === "all" 
    ? players 
    : players.filter(player => player.position.toLowerCase() === activePosition);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="fantasy-card m-4 mb-6">
        <h1 className="text-2xl font-black text-foreground mb-4">Available Players</h1>
        
        {/* Position Filter */}
        <TabNavigation
          tabs={positionTabs}
          activeTab={activePosition}
          onTabChange={setActivePosition}
        />
      </div>

      {/* Players List */}
      <div className="px-4 space-y-3">
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            name={player.name}
            position={player.position}
            team={player.team}
            avatar={player.avatar}
            onClick={() => onNavigate('stats')}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPlayers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary-foreground">
            No players found for {activePosition.toUpperCase()}
          </p>
        </div>
      )}

      <BottomNavigation 
        activeTab={activeNavTab} 
        onTabChange={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'home') onNavigate('landing');
          if (tab === 'stats') onNavigate('stats');
        }} 
      />
    </div>
  );
}