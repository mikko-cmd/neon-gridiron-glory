import { Home, BarChart3, Users, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "stats", icon: BarChart3, label: "Statistics" },
  { id: "players", icon: Users, label: "Players" },
  { id: "messages", icon: MessageCircle, label: "Messages" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 fantasy-card rounded-t-2xl border-t-2 border-secondary bg-background/95 backdrop-blur-lg">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-secondary-foreground hover:text-primary"
              )}
            >
              <Icon 
                className={cn(
                  "h-6 w-6 mb-1 transition-all duration-200",
                  isActive && "drop-shadow-[0_0_8px_hsl(var(--neon-purple))]"
                )} 
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}