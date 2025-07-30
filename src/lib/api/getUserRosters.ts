const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getUserRosters(user_email: string) {
  const res = await fetch(`${API_BASE_URL}/api/leagues/get?user_email=${encodeURIComponent(user_email)}`);
  if (!res.ok) throw new Error('Failed to fetch leagues');
  return res.json();
} 