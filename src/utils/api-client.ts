const API_URL = process.env.NEXT_PUBLIC_URL as string;

export function getApiUrl() {
  return API_URL;
}

interface FetchOptions extends RequestInit {
  token?: string;
  cache?: "force-cache" | "no-store";
  next?: {
    revalidate?: false | 0 | number;
    tags?: string[];
  };
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(fetchOptions.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "You are not authenticated. Please sign in and try again.",
      );
    }

    if (response.status === 403) {
      throw new Error("You do not have permission to perform this action.");
    }

    throw new Error(
      `Request failed: ${response.statusText} (${response.status})`,
    );
  }

  return response.json() as Promise<T>;
}
