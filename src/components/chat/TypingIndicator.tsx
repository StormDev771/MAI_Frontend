import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const TypingIndicator: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="flex items-start space-x-3 mb-6">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isDark ? 'bg-blue-400' : 'bg-blue-500'
      }`}>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
      </div>
      <div className={`px-4 py-3 rounded-2xl shadow-md ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}>
        <div className="flex space-x-1">
          <div className={`w-2 h-2 rounded-full animate-bounce ${
            isDark ? 'bg-gray-500' : 'bg-gray-400'
          }`}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${
            isDark ? 'bg-gray-500' : 'bg-gray-400'
          }`} style={{ animationDelay: '0.1s' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${
            isDark ? 'bg-gray-500' : 'bg-gray-400'
          }`} style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;