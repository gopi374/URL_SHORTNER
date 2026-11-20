// API service for URL Shortener

const DEFAULT_API_URL = "http://localhost:3000";

export const getApiUrl = () => {
  return localStorage.getItem("snapurl_api_url") || DEFAULT_API_URL;
};

export const setApiUrl = (url) => {
  localStorage.setItem("snapurl_api_url", url.trim().replace(/\/$/, ""));
};

// Check backend health
export const checkBackendHealth = async () => {
  const base = getApiUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${base}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return { online: true, message: data.message || "Connected" };
    }
  } catch (err) {
    // try root endpoint
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${base}/`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) return { online: true, message: "Connected" };
    } catch {
      // Backend offline
    }
  }
  return { online: false, message: "Backend offline (Demo fallback available)" };
};

// Shorten URL function
export const shortenUrl = async (originalUrl, customAlias = "") => {
  const base = getApiUrl();
  
  // Format check
  let trimmed = originalUrl.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    
    const response = await fetch(`${base}/short`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalUrl: trimmed,
        customAlias: customAlias.trim() || undefined,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.msg || "Failed to shorten URL");
    }

    return {
      success: true,
      data: {
        originalUrl: data.originalUrl,
        shortUrl: data.shortUrl,
        shortcode: data.shortcode,
        clicks: data.clicks || 0,
        createdAt: data.createdAt || new Date().toISOString(),
        isLocalMock: false,
      },
    };
  } catch (err) {
    // If backend connection failed (e.g. server down or network error)
    if (err.name === "AbortError" || err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
      console.warn("Backend not reachable, creating local simulation:", err.message);
      
      // Generate client-side simulation code
      const mockCode = customAlias.trim() || Math.random().toString(36).substring(2, 9);
      const mockResult = {
        originalUrl: trimmed,
        shortUrl: `${base}/${mockCode}`,
        shortcode: mockCode,
        clicks: 0,
        createdAt: new Date().toISOString(),
        isLocalMock: true,
      };

      return {
        success: true,
        data: mockResult,
        warning: "Generated in Demo Mode (Backend is currently offline or unreachable at " + base + ").",
      };
    }

    // Server-level validation error (like invalid URL or duplicate alias)
    return {
      success: false,
      error: err.message || "An error occurred while shortening the URL",
    };
  }
};

// Local storage history helpers
const STORAGE_KEY = "snapurl_history_links";

export const getStoredLinks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredLink = (linkItem) => {
  try {
    const links = getStoredLinks();
    // Prepend new item and filter duplicates by shortcode
    const filtered = links.filter((item) => item.shortcode !== linkItem.shortcode);
    const updated = [linkItem, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 100))); // keep latest 100
    return updated;
  } catch {
    return [];
  }
};

export const removeStoredLink = (shortcode) => {
  try {
    const links = getStoredLinks();
    const updated = links.filter((item) => item.shortcode !== shortcode);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const clearStoredLinks = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch {
    return [];
  }
};
