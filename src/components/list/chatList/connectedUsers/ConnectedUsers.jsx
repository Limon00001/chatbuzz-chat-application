/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// Internal Imports
import { useChatStore } from '../../../../lib/chatStore';
import { db } from '../../../../lib/firebase';
import { useUserStore } from '../../../../lib/userStore';

// ConnectedUsers Component
const ConnectedUsers = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, 'userchats', currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, 'users', item.recieverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return {
            ...item,
            user,
          };
        });
        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      },
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId,
    );

    userChats[chatIndex].isSeen = true;
    const userChatsRef = await doc(db, 'userchats', currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });

      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {chats?.map((chat) => (
        <div
          key={chat.chatId}
          className={`flex items-center gap-5 p-5 cursor-pointer border-b border-b-gray-700 ${
            chat?.isSeen ? 'bg-transparent' : 'bg-teal-500/30'
          }`}
          onClick={() => handleSelect(chat)}
        >
          <img
            src={chat?.user?.profileImage || './profile.png'}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />

          <div key={chat.chatId} className="flex flex-col gap-2">
            <span className="font-semibold">{chat?.user?.username}</span>
            <p className="text-sm text-gray-400">{chat?.lastMessage}</p>
          </div>
        </div>
      ))}
    </>
  );
};

// Export
export default ConnectedUsers;
