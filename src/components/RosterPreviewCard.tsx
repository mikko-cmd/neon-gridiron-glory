import { useState } from "react";

interface RosterPreviewCardProps {
  username: string;
  starters: string[];
  roster: string[];
  lastSynced: string;
  onResync: () => void;
}

export default function RosterPreviewCard({
  username,
  starters,
  roster,
  lastSynced,
  onResync,
}: RosterPreviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#1a0033] rounded-xl shadow-md p-4 border border-purple-500 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{username}</h2>
        <button onClick={onResync} className="text-sm text-purple-300 hover:underline">
          Resync
        </button>
      </div>

      <div className="mt-2">
        <p className="text-sm mb-1 text-purple-400">Starters:</p>
        <div className="flex flex-wrap gap-2">
          {starters.map((player, index) => (
            <span
              key={index}
              className="bg-purple-700 text-sm px-2 py-1 rounded-full"
            >
              {player}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-purple-400 hover:underline"
        >
          {expanded ? 'Hide Full Roster' : 'Show Full Roster'}
        </button>
        {expanded && (
          <ul className="list-disc ml-6 mt-1 text-sm text-purple-300">
            {roster.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-3 text-xs text-purple-500">
        Last synced: {new Date(lastSynced).toLocaleString()}
      </div>
    </div>
  );
} 