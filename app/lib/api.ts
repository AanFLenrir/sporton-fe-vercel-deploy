const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL belum diset di .env.local");
}

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Fetch error ${res.status}`);
  }

  return res.json();
}

export function getImageUrl(path?: string | null) {
  if (!path) return "/placeholder.png";
  return `${API_URL}/storage/${path}`;
}
