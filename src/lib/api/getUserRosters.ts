export async function getUserRosters(user_email: string) {
  const res = await fetch(`/api/leagues/get?user_email=${encodeURIComponent(user_email)}`);
  if (!res.ok) throw new Error('Failed to fetch leagues');
  return res.json();
} 