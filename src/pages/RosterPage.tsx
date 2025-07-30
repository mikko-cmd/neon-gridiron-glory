import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserRosters } from "@/lib/api/getUserRosters";
import { syncRoster } from "@/lib/api/syncLeague";
import RosterPreviewCard from "@/components/RosterPreviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RosterPage() {
  const { leagueId } = useParams<{ leagueId: string }>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Replace with actual user email when auth is implemented
  const userEmail = "test@example.com";

  const { data, isLoading, error } = useQuery({
    queryKey: ["userRosters", userEmail],
    queryFn: () => getUserRosters(userEmail),
  });

  const syncMutation = useMutation({
    mutationFn: (params: { sleeper_league_id: string; sleeper_username: string; user_email: string }) => syncRoster(params),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Roster is being re-synced. Data will update shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ["userRosters", userEmail] });
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to re-sync roster.",
        variant: "destructive",
      });
    },
  });

  const league = data?.find((l) => l.sleeper_league_id === leagueId);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-8 w-1/4 mb-6" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Failed to load league data: {error.message}</div>;
  }

  if (!league) {
    return <div className="p-4">League not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Button asChild variant="outline" className="mb-6">
        <Link to="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Leagues
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6">{league.league_name}</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {league.rosters_json.map((roster) => (
          <RosterPreviewCard
            key={roster.owner_id}
            username={roster.username}
            starters={roster.starters}
            roster={roster.roster}
            lastSynced={league.last_synced_at}
            onResync={() => {
              if (leagueId) {
                syncMutation.mutate({
                  sleeper_league_id: leagueId,
                  sleeper_username: roster.username,
                  user_email: userEmail,
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
} 