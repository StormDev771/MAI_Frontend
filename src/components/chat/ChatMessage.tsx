import React from 'react';
import { Bot, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`flex items-start space-x-3 mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isDark ? 'bg-blue-400' : 'bg-blue-500'
        }`}>
          <Bot size={16} className="text-white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isBot 
          ? isDark 
            ? 'bg-gray-800 text-gray-100 shadow-md border border-gray-700' 
            : 'bg-white text-gray-800 shadow-md'
          : isDark
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-blue-500 text-white shadow-md'
      }`}>
        <p className="text-sm leading-relaxed">{message}</p>
        <p className={`text-xs mt-2 ${
          isBot 
            ? isDark ? 'text-gray-400' : 'text-gray-500'
            : isDark ? 'text-blue-200' : 'text-blue-100'
        }`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {!isBot && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isDark ? 'bg-gray-600' : 'bg-gray-500'
        }`}>
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;