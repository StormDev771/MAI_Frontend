import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Message, WeatherResponse, ChatContextType } from "../types";
import { weatherApi } from "../services/weatherApi";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I’m your Mosquito Activity Index assistant. Which region’s MAI information would you like to know?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [response, setResponse] = useState<WeatherResponse | null>(null);

  const clearHistory = useCallback(() => {
    setMessages([
      {
        id: "1",
        text: "Hello! I’m your Mosquito Activity Index assistant. Which region’s MAI information would you like to know?",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
    setResponse(null);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call the weather API
      const weatherResponse = await weatherApi.getWeatherSummary(text);

      setResponse(weatherResponse);

      // Create bot response message
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text:
          weatherResponse.summary ||
          "I received your request but no summary was provided.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // Handle API error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          error instanceof Error
            ? error.message
            : "Sorry, I encountered an error while processing your request. Please try again.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const value: ChatContextType = {
    messages,
    isTyping,
    response,
    sendMessage,
    clearHistory,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
