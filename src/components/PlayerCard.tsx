import { ChevronRight } from "lucide-react";

interface PlayerCardProps {
  name: string;
  position: string;
  team: string;
  avatar: string;
  onClick?: () => void;
}

export function PlayerCard({ name, position, team, avatar, onClick }: PlayerCardProps) {
  return (
    <div 
      className="fantasy-card flex items-center justify-between p-4 hover:bg-secondary/10 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover avatar-glow"
        />
        <div>
          <h3 className="font-bold text-foreground">{name}</h3>
          <p className="text-sm text-secondary-foreground">{position} • {team}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-secondary-foreground" />
    </div>
  );
}