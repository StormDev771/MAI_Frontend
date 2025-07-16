import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Send, Plus, Settings, Mic } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export interface ChatInputRef {
  focus: () => void;
}

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
  ({ onSendMessage, disabled }, ref) => {
    const { isDark } = useTheme();
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const handleSubmit = (e: React.FormEvent) => {
      console.log("message", message);
      e.preventDefault();
      if (message.trim() && !disabled) {
        onSendMessage(message.trim());
        setMessage("");
        // Keep focus on input after sending
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    };

    return (
      <div className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`flex items-center rounded-full border shadow-sm hover:shadow-md transition-all duration-200 focus-within:shadow-lg ${
              isDark
                ? "bg-gray-800 border-gray-600 focus-within:border-gray-500"
                : "bg-gray-100 border-gray-200 focus-within:border-gray-300"
            }`}
          >
            <button
              type="button"
              className={`flex-shrink-0 p-3 rounded-full transition-colors duration-200 ml-2 ${
                isDark
                  ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Plus size={20} />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything"
              disabled={disabled}
              autoFocus
              className={`flex-1 px-4 py-4 bg-transparent border-none focus:outline-none text-base disabled:opacity-50 ${
                isDark
                  ? "text-gray-100 placeholder-gray-400"
                  : "text-gray-800 placeholder-gray-500"
              }`}
            />

            <div className="flex items-center space-x-1 mr-2">
              <button
                type="button"
                className={`flex-shrink-0 p-2 rounded-full transition-colors duration-200 ${
                  isDark
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Settings size={18} />
              </button>

              <button
                type="button"
                className={`flex-shrink-0 p-2 rounded-full transition-colors duration-200 ${
                  isDark
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Mic size={18} />
              </button>

              <button
                type="submit"
                disabled={!message.trim() || disabled}
                className={`flex-shrink-0 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ml-1 ${
                  !message.trim() || disabled
                    ? isDark
                      ? "text-gray-600 bg-gray-700 cursor-not-allowed"
                      : "text-gray-400 bg-gray-300 cursor-not-allowed"
                    : isDark
                    ? "text-white bg-gray-700 hover:bg-gray-600 focus:ring-gray-400"
                    : "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-500"
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
