import React, { useState } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface RosterPreviewCardProps {
  username: string;
  starters: string[];
  fullRoster: string[];
  lastSyncedAt: string;
  onResync: () => void;
}

// Position-based color mapping for player pills
const getPositionColor = (playerName: string): string => {
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

export const RosterPreviewCard: React.FC<RosterPreviewCardProps> = ({
  username,
  starters,
  fullRoster,
  lastSyncedAt,
  onResync
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="cyber-card group max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground neon-text">
          {username}
        </h3>
      </div>

      {/* Starters Section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-secondary-foreground mb-3 uppercase tracking-wider">
          Starting Lineup
        </h4>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {starters.map((player, index) => (
            <PlayerPill key={`starter-${index}`} playerName={player} />
          ))}
        </div>
      </div>

      {/* Full Roster Section */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full mb-3 text-sm font-medium text-secondary-foreground uppercase tracking-wider hover:text-foreground transition-colors group">
            <span>Full Roster ({fullRoster.length} players)</span>
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform duration-300 group-hover:text-primary",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 animate-accordion-down">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {fullRoster.map((player, index) => (
              <PlayerPill key={`roster-${index}`} playerName={player} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 mt-6 border-t border-border/20 gap-3">
        <span className="text-xs text-muted-foreground">
          Last synced: {lastSyncedAt}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onResync}
          className="neon-button-outline text-xs hover:scale-105 transition-transform"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Resync Roster
        </Button>
      </div>
    </div>
  );
};