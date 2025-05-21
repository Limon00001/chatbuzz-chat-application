/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

// Internal Imports
import { useChatStore } from '../../../lib/chatStore';
import { db } from '../../../lib/firebase';
import { useUserStore } from '../../../lib/userStore';

// ChatContainer Component
const ChatContainer = ({ img, setImg }) => {
  const [chat, setChat] = useState();
  const messagesEndRef = useRef(null);

  const { chatId } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  return (
    <section className="flex flex-col gap-5 flex-1 p-5 overflow-y-scroll overflow-x-hidden">
      {chat?.messages?.map((message) => (
        <div
          key={message.id || message.timestamp}
          className={`flex ${
            message.senderId === currentUser.id
              ? 'justify-end'
              : 'justify-start'
          }`}
        >
          <div
            className={`flex flex-col max-w-[60%] ${
              message.senderId === currentUser.id ? 'items-end' : 'items-start'
            }`}
          >
            {message?.img && (
              <div className="image-container w-fit">
                <img
                  src={message?.img}
                  alt="Chat image"
                  className="max-w-[300px] w-auto h-auto max-h-[300px] rounded-xl object-cover mb-1"
                  loading="lazy"
                />
              </div>
            )}
            {message.message && (
              <p
                className={`px-4 py-2 rounded-lg max-w-full break-words ${
                  message.senderId === currentUser.id
                    ? 'bg-teal-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-white rounded-bl-none'
                }`}
              >
                {message.message}
              </p>
            )}
            <span className="text-xs text-gray-400 mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      ))}
      {img.url && (
        <div className="message own preview">
          <div className="image-container">
            <img
              src={img.url}
              alt=""
              className="w-[300px] h-auto max-h-[300px] rounded-xl object-cover"
            />
          </div>
        </div>
      )}
      <div ref={messagesEndRef}></div>
    </section>
  );
};

// Export
export default ChatContainer;
