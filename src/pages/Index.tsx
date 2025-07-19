import { useState } from "react";
import { LandingPage } from "./LandingPage";
import { PlayerStatsPage } from "./PlayerStatsPage";
import { PlayersListPage } from "./PlayersListPage";

type Page = "landing" | "stats" | "players";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("landing");

  const navigateToPage = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={navigateToPage} />;
      case "stats":
        return <PlayerStatsPage onNavigate={navigateToPage} />;
      case "players":
        return <PlayersListPage onNavigate={navigateToPage} />;
      default:
        return <LandingPage onNavigate={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
};

export default Index;
