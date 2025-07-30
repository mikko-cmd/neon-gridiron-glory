import { useState } from "react";
import { X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface SleeperLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SleeperLeagueModal({ isOpen, onClose }: SleeperLeagueModalProps) {
  const [leagueId, setLeagueId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleConnect = async () => {
    if (!leagueId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a League ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your Sleeper league has been connected successfully",
      });
      setIsLoading(false);
      setLeagueId("");
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setLeagueId("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-card/95 backdrop-blur-md border border-primary/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            Connect Your Sleeper League
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-2">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            Paste your Sleeper League ID to connect your team and sync your roster with real-time updates.
          </p>
          
          {/* League ID Input */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="leagueId" className="text-sm font-medium">
                League ID
              </Label>
              <div className="relative">
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-md shadow-lg text-xs text-popover-foreground whitespace-nowrap z-50">
                    Find your League ID in Sleeper app settings
                  </div>
                )}
              </div>
            </div>
            <Input
              id="leagueId"
              type="text"
              placeholder="918321066570567680"
              value={leagueId}
              onChange={(e) => setLeagueId(e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary/40 focus:ring-primary/20"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-primary/20 hover:bg-primary/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConnect}
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? "Connecting..." : "Connect League"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}