import { getClientID } from "../utils/api";

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

  async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(
        `${this.baseUrl}${endpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`,
            clientID: this.clientID,
            ...headers,
          },
        }
      );
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Fetch GET error:", error);
      throw error;
    }
  }

  async post<T, D>(
    endpoint: string,
    data: D,
    headers?: HeadersInit
  ): Promise<T> {
    try {
      const response = await fetch(
        `${this.baseUrl}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
            clientID: this.clientID,
            ...headers,
          },
          body: JSON.stringify(data),
        }
      );
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Fetch POST error:", error);
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      window.location.href = "/login";
      throw new Error("Unauthorized access - redirecting to login.");
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }
    return response.json() as Promise<T>;
  }
}
