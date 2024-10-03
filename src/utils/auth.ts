export function setCookie(name: string, value: string, days?: number): void {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const token = parts.pop()?.split(";").shift() || null;

    if (token && _isTokenExpired(token)) {
      removeCookie(name);
      return null;
    }

    return token;
  }

  return null;
}
function _isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

export function removeCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}
