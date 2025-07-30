import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getUserRosters } from "@/lib/api/getUserRosters";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  // Replace with actual user email when auth is implemented
  const userEmail = "test@example.com";

  const { data: leagues, isLoading, error } = useQuery({
    queryKey: ["userRosters", userEmail],
    queryFn: () => getUserRosters(userEmail),
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Leagues</h1>
        <Button>Sync New League</Button>
      </div>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500">
          <p>Failed to load leagues: {error.message}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid gap-4 md:grid-cols-