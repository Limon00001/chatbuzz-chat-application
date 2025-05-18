/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal imports
import ChatContainer from './chatContainer/ChatContainer';
import ChatHeader from './chatHeader/ChatHeader';
import MessageInput from './messageInput/MessageInput';

// Chat Component
const Chat = () => {
  return (
    <section className="flex flex-col flex-2 border-r border-r-gray-700 border-l border-l-gray-700 h-[100%]">
      {/* Chat Header */}
      <ChatHeader />
      {/* Chat Messages */}
      <ChatContainer />
      {/* Message Input */}
      <MessageInput />
    </section>
  );
};

// Export
export default Chat;
