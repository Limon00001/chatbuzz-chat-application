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

// ChatContainer Component
const ChatContainer = () => {
  const [chat, setChat] = useState();
  const messagesEndRef = useRef(null);

  const { chatId } = useChatStore();

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
      {/* <div className="message" key={message?.createdAt}>
        {message?.img && (
          <img
            src={message?.img}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div>
          <p className="p-4 bg-black/30 rounded-lg">{message?.text}</p>
          <span className="text-sm">{}</span>
        </div>
      </div> */}

      {chat?.messages?.map((message) => (
        <div key={message?.createdAt} className="message own">
          <div>
            {message?.img && (
              <img
                src={message?.img}
                alt=""
                className="w-[100%] h-[300px] rounded-xl object-cover mb-1"
              />
            )}
            <p className="ownText px-3 py-2 bg-black/30 rounded-lg">
              {message?.message}
            </p>
            <span className="text-sm">1 min ago</span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </section>
  );
};

// Export
export default ChatContainer;
