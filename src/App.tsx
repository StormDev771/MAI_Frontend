import React, { useEffect, useRef } from 'react';
import { Bug, Moon, Sun, Trash2 } from 'lucide-react';
import BackgroundAnimation from './components/ui/BackgroundAnimation';
import ChatMessage from './components/chat/ChatMessage';
import ChatInput, { ChatInputRef } from './components/chat/ChatInput';
import TypingIndicator from './components/chat/TypingIndicator';
import ConfirmationModal from './components/ui/ConfirmationModal';
import { useChat } from './contexts/ChatContext';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { messages, isTyping, sendMessage, clearHistory } = useChat();
  const { isDark, toggleTheme } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<ChatInputRef>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // Auto-focus input when bot finishes typing
    if (!isTyping && messages.length > 1) {
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 100);
    }
  }, [messages, isTyping]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    clearHistory();
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-20 backdrop-blur-md border-b shadow-sm ${
          isDark 
            ? 'bg-gray-900/90 border-gray-700' 
            : 'bg-white/90 border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-blue-400' : 'bg-blue-500'
                }`}>
                  <Bug size={20} className="text-white" />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    MAI Assistant
                  </h1>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Mosquito Activity Index Chatbot
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDeleteClick}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isDark 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title="Clear chat history"
                >
                  <Trash2 size={18} />
                </button>
                
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isDark 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-20 pb-24">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="fixed bottom-0 left-0 right-0 z-20">
            <div className="px-4 py-6">
              <ChatInput 
                ref={chatInputRef}
                onSendMessage={sendMessage} 
                disabled={isTyping} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Clear Chat History"
        message="Are you sure you want to delete all chat messages? This action cannot be undone."
      />
    </div>
  );
}

export default App;