export function setToken(key: string, token: string): void {
  setItem(key, token);
}

export function getToken(key: string): string | null {
  const token = getItem(key);
  if (token && _isTokenExpired(token)) {
    removeToken(key);
    return null;
  }
  return token;
}

export function removeToken(key: string): void {
  localStorage.removeItem(key);
}

function _isTokenExpired(token: string): boolean {
  try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
  } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Treat as expired if there's an error
  }
}

function setItem(key: string, value: string): void {
  localStorage.setItem(key, value);
}

function getItem(key: string): string | null {
  return localStorage.getItem(key);
}
