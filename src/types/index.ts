export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface WeatherResponse {
  summary: string;
  temperature?: number;
  location?: string;
  conditions?: string;
}

export interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  response: WeatherResponse | null;
  sendMessage: (message: string) => void;
  clearHistory: () => void;
}