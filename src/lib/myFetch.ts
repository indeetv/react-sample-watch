import { getClientID } from "../utils/api";
import { removeToken } from "../utils/auth";

export class myFetch {
  private baseUrl: string;
  private clientID: string;
  private token: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL || "";
    this.token = import.meta.env.VITE_API_KEY || "";
    this.clientID = getClientID();

    // Validate environment variables
    if (!this.baseUrl || !this.token) {
      throw new Error(
        !this.baseUrl
          ? "Base URL is not defined in the environment variables."
          : "Token is not defined in the environment variables."
      );
    }
  }

  async get<T>(
    endpoint: string,
    headers?: HeadersInit | null,
    isFullUrl: boolean = false
  ): Promise<T> {
    try {
      const url = isFullUrl ? endpoint : `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          clientID: this.clientID,
          ...headers,
        },
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Fetch GET error:", error);
      throw error;
    }
  }

  async post<T, TData>(
    endpoint: string,
    data: TData,
    headers?: HeadersInit,
    isFullUrl: boolean = false
  ): Promise<T> {
    try {
      const url = isFullUrl ? endpoint : `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
          clientID: this.clientID,
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Fetch POST error:", error);
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T | string> {
    const responseBody = await response.text();
    const contentType = response.headers.get("Content-Type");
    const isHtml = contentType && contentType.includes("text/html");
    if (response.status === 401 && window.location.pathname !== "/login") {
      removeToken("token");
      removeToken("rfToken");
      window.location.href = "/login";
      throw new Error("Unauthorized access - redirecting to login.");
    }
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${responseBody}`
      );
    }
    if (isHtml) {
      return responseBody;
    }
    return JSON.parse(responseBody) as T;
  }
}
