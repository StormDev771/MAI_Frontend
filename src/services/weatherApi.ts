import { WeatherResponse } from "../types";

const API_BASE_URL = "https://mai-backend-oqe2.onrender.com";

export const weatherApi = {
  async getWeatherSummary(query: string): Promise<WeatherResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/weather-summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ region: query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Weather API error:", error);
      throw new Error("Failed to fetch weather data. Please try again.");
    }
  },
};
