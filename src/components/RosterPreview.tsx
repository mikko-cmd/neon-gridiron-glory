import React, { useState } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface RosterData {
  username: string;
  starters: string[];
  roster: string[];
}

interface RosterPreviewProps {
  rosters_json: RosterData[];
}

// Position-based color mapping for pills
const getPositionColor = (playerName: string): string => {
  // Mock position detection based on common player names/patterns
  const name = playerName.toLowerCase();
  
  if (name.includes('mahomes') || name.includes('jackson') || name.includes('allen')) {
    return 'bg-gradient-to-r from-cyan-400 to-cyan-500'; // QB
  }
  if (name.includes('mccaffrey') || name.includes('henry') || name.includes('cook')) {
    return 'bg-gradient-to-r from-green-400 to-green-500'; // RB
  }
  if (name.includes('adams') || name.includes('hill') || name.includes('jefferson')) {
    return 'bg-gradient-to-r from-purple-400 to-purple-500'; // WR
  }
  if (name.includes('kelce') || name.includes('waller') || name.includes('kittle')) {
    return 'bg-gradient-to-r from-orange-400 to-orange-500'; // TE
  }
  if (name.includes('tucker') || name.includes('bass')) {
    return 'bg-gradient-to-r from-yellow-400 to-yellow-500'; // K
  }
  if (name.includes('steelers') || name.includes('bills')) {
    return 'bg-gradient-to-r from-red-400 to-red-500'; // DEF
  }
  
  // Default neon colors for unknown positions
  const colors = [
    'bg-gradient-to-r from-pink-400 to-pink-500',
    'bg-gradient-to-r from-blue-400 to-blue-500',
    'bg-gradient-to-r from-indigo-400 to-indigo-500',
    'bg-gradient-to-r from-emerald-400 to-emerald-500',
  ];
  
  return colors[playerName.length % colors.length];
};

const PlayerPill: React.FC<{ playerName: string }> = ({ playerName }) => {
  const colorClass = getPositionColor(playerName);
  
  return (
    <div
      className={cn(
        'inline-block px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg',
        'transition-all duration-200 hover:scale-105 hover:shadow-xl',
        colorClass
      )}
    >
      {playerName}
    </div>
  );
};

const RosterCard: React.FC<{ roster: RosterData }> = ({ roster }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="cyber-card group">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground neon-text">
          {roster.username}
        </h3>
      </div>

      {/* Starters Section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-secondary-foreground mb-3 uppercase tracking-wider">
          Starters
        </h4>
        <div className="flex flex-wrap gap-2">
          {roster.starters.map((player, index) => (
            <PlayerPill key={`starter-${index}`} playerName={player} />
          ))}
        </div>
      </div>

      {/* Full Roster Section */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full mb-3 text-sm font-medium text-secondary-foreground uppercase tracking-wider hover:text-foreground transition-colors">
            <span>Full Roster ({roster.roster.length} players)</span>
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {roster.roster.map((player, index) => (
              <PlayerPill key={`roster-${index}`} playerName={player} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-6 border-t border-border/20">
        <span className="text-xs text-muted-foreground">
          Synced: 3h ago
        </span>
        <Button
          variant="outline"
          size="sm"
          className="neon-button-outline text-xs"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Resync
        </Button>
      </div>
    </div>
  );
};

export const RosterPreview: React.FC<RosterPreviewProps> = ({ rosters_json }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground neon-text mb-2">
          League Rosters
        </h2>
        <p className="text-muted-foreground">
          Current roster status for all managers
        </p>
      </div>
      
      {rosters_json.map((roster, index) => (
        <RosterCard key={`roster-${index}`} roster={roster} />
      ))}
    </div>
  );
};

// Mock data for development
export const mockRosterData: RosterData[] = [
  {
    username: "slantaclause",
    starters: [
      "L Jackson",
      "D Achane", 
      "D Montgomery",
      "P Nacua",
      "G Wilson",
      "M Andrews",
      "C Sutton",
      "J Addison",
      "J Reed"
    ],
    roster: [
      "L Jackson", "D Achane", "D Montgomery", "P Nacua", "G Wilson",
      "M Andrews", "C Sutton", "J Addison", "J Reed", "T Bass",
      "Bills D/ST", "B Robinson", "R White", "D Smith", "T Higgins",
      "D Goedert", "J Williams", "Chiefs D/ST"
    ]
  },
  {
    username: "GridironGuru",
    starters: [
      "P Mahomes",
      "C McCaffrey",
      "D Henry", 
      "D Adams",
      "T Hill",
      "T Kelce",
      "M Evans",
      "A Cooper",
      "Cowboys D/ST"
    ],
    roster: [
      "P Mahomes", "C McCaffrey", "D Henry", "D Adams", "T Hill",
      "T Kelce", "M Evans", "A Cooper", "Cowboys D/ST", "J Tucker",
      "K Allen", "A Jones", "C Lamb", "D Waller", "J Jacobs",
      "R Stevenson", "Eagles D/ST", "D Hopkins"
    ]
  },
  {
    username: "EndZoneElite",
    starters: [
      "J Allen",
      "A Ekeler",
      "J Taylor",
      "J Jefferson",
      "S Diggs",
      "G Kittle",
      "D Johnson",
      "C Ridley",
      "Steelers D/ST"
    ],
    roster: [
      "J Allen", "A Ekeler", "J Taylor", "J Jefferson", "S Diggs",
      "G Kittle", "D Johnson", "C Ridley", "Steelers D/ST", "Y Koo",
      "T Pollard", "J Waddle", "D Moore", "P Freiermuth", "B Hall",
      "J Conner", "49ers D/ST", "M Pittman"
    ]
  }
];