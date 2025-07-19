import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabNavigation({ tabs, activeTab, onTabChange, className }: TabNavigationProps) {
  return (
    <div className={cn("flex space-x-2 p-1 bg-secondary/20 rounded-xl", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
            activeTab === tab.id
              ? "tab-active"
              : "tab-inactive hover:bg-secondary/50"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}