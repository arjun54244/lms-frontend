let cachedApiBase: string | null = null;

const defaultCandidates = [
  "http://localhost:5000/api",
  "http://localhost:5001/api",
  "http://localhost:5002/api",
  "http://localhost:5003/api",
  "http://localhost:5004/api",
  "http://localhost:5005/api",
  "http://localhost:5006/api",
  "http://localhost:5007/api",
  "http://localhost:5008/api",
  "http://localhost:5009/api",
  "http://localhost:5010/api",
  "http://localhost:5011/api",
  "http://localhost:5012/api",
];

export async function discoverApiBase(): Promise<string> {
  if (cachedApiBase) return cachedApiBase;
  const fromEnv = (import.meta as any).env?.VITE_BACKEND_API_URL as string | undefined;
  const candidates = fromEnv ? [fromEnv] : defaultCandidates;
  for (const base of candidates) {
    try {
      const url = base.replace(/\/$/, "");
      const res = await fetch(url.replace(/\/api$/, "") + "/health", { method: "GET" });
      if (res.ok) {
        cachedApiBase = url;
        return cachedApiBase;
      }
    } catch {
      // try next
    }
  }
  // fallback to first
  cachedApiBase = candidates[0];
  return cachedApiBase;
}

export async function apiPost(path: string, body: any) {
  const base = await discoverApiBase();
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (json as any)?.message || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return json;
}


