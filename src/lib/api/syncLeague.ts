/**
 * Defines the shape of the data required to sync a league.
 */
interface SyncLeaguePayload {
  sleeper_league_id: string;
  sleeper_username: string;
  user_email: string;
}

/**
 * Calls the backend to connect a league and then immediately syncs the user's roster.
 * This is the primary function to use from the frontend when adding a new league.
 *
 * @param {SyncLeaguePayload} payload - The necessary data from the user.
 * @returns The final, fully-synced league object.
 * @throws If either the league connection or roster sync API call fails.
 */
export async function syncLeagueAndRoster(payload: SyncLeaguePayload) {
  // Use an environment variable for the API base URL.
  // Fallback to a relative path for same-project deployments.
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Step 1: Connect the league to create the initial record in the database.
  const connectRes = await fetch(`${API_BASE_URL}/api/sync-league`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });

  const connectResult = await connectRes.json();
  if (!connectRes.ok) {
    // Throw the specific error message from the backend if available.
    throw new Error(connectResult.error || 'Failed to connect the league.');
  }

  const { sleeper_league_id, user_email } = connectResult.data;
  
  // Step 2: Immediately sync the roster for the newly connected league.
  const rosterRes = await fetch(`${API_BASE_URL}/api/rosters/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sleeper_league_id,
        user_email,
        sleeper_username: payload.sleeper_username,
      }),
    });

    const rosterResult = await rosterRes.json();
    if (!rosterRes.ok) {
        throw new Error(rosterResult.error || 'Failed to sync the roster after connecting.');
    }
  
  // The final, fully synced data is returned by the second API call.
  return rosterResult.data;
} 

interface SyncRosterParams {
  sleeper_league_id: string;
  sleeper_username: string;
  user_email: string;
}

export async function syncRoster({
  sleeper_league_id,
  sleeper_username,
  user_email,
}: SyncRosterParams) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}/api/rosters/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sleeper_league_id,
      sleeper_username,
      user_email,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to sync roster');
  }

  return res.json();
} 