import { useState } from "react";
import matrixBg from "@/assets/matrix-bg.png";
import { SleeperLeagueModal } from "@/components/SleeperLeagueModal";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [isSleeperModalOpen, setIsSleeperModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${matrixBg})`,
          filter: 'brightness(0.3)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="space-y-8">
          {/* Hero Title */}
          <h1 className="text-hero text-neon">
            FANTASY 2024
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-secondary-foreground font-medium max-w-md">
            Build your ultimate team and dominate the league
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-4 pt-8">
            <button 
              className="btn-neon-primary w-full max-w-sm"
              onClick={() => setIsSleeperModalOpen(true)}
            >
              Connect Your Sleeper League
            </button>
            
            <button 
              className="btn-neon-primary w-full max-w-sm"
              onClick={() => onNavigate('players')}
            >
              Sign Up & Draft
            </button>
            
            <button 
              className="btn-neon-outline w-full max-w-sm"
              onClick={() => onNavigate('stats')}
            >
              Log In
            </button>
          </div>
          
          {/* Features */}
          <div className="pt-12 space-y-3 text-secondary-foreground">
            <p className="text-sm">✨ Real-time player stats</p>
            <p className="text-sm">🏆 Compete with friends</p>
            <p className="text-sm">📊 Advanced analytics</p>
          </div>
        </div>
      </div>

      {/* Sleeper League Modal */}
      <SleeperLeagueModal 
        isOpen={isSleeperModalOpen} 
        onClose={() => setIsSleeperModalOpen(false)} 
      />
    </div>
  );
}