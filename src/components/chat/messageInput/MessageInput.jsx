/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Images } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

// Internal Imports
import { useChatStore } from '../../../lib/chatStore';
import { db } from '../../../lib/firebase';
import upload from '../../../lib/upload';
import { useUserStore } from '../../../lib/userStore';

// MessageInput Component
const MessageInput = ({ img, setImg }) => {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [message, setMessage] = useState({
    message: '',
  });

  const { chatId, user, isCurrentUserBlocked, isRecieverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleMessage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmoji = (emoji) => {
    setMessage((prev) => ({
      ...prev,
      message: prev.message + emoji.emoji,
    }));
    setIsOpenEmoji(false);
  };

  const handleSend = async () => {
    if (!message.message.trim() && !img.file) return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          message: message.message.trim(),
          timestamp: new Date().toISOString(),
          // ...(imgUrl && { img: imgUrl }),
          img: imgUrl,
        }),
      });

      const userIDs = [currentUser.id, user.id];

      await Promise.all(
        userIDs.map(async (id) => {
          const userChatsRef = doc(db, 'userchats', id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();
            const chatIndex = userChatsData.chats.findIndex(
              (chat) => chat.chatId === chatId,
            );

            if (chatIndex !== -1) {
              userChatsData.chats[chatIndex] = {
                ...userChatsData.chats[chatIndex],
                lastMessage: message.message.trim() || '📷 Image',
                isSeen: id === currentUser.id,
                updatedAt: Date.now(),
              };

              await updateDoc(userChatsRef, {
                chats: userChatsData.chats,
              });
            }
          }
        }),
      );

      // Reset states
      setMessage({ message: '' });
      setImg({ file: null, url: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to send message');
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg({
        ...img,
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="relative flex items-center justify-between p-5 gap-5 border-t border-t-gray-700 mt-auto">
      <div className="flex items-center gap-5">
        <label
          htmlFor="file"
          className={`${
            isCurrentUserBlocked || isRecieverBlocked
              ? 'opacity-50 cursor-not-allowed pointer-events-none'
              : 'cursor-pointer'
          }`}
        >
          <Images className="h-7 w-7 gap-5" />
        </label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleImage}
          className="hidden"
        />
      </div>
      <textarea
        rows={1}
        cols={1}
        maxLength={100}
        minLength={1}
        autoFocus
        autoComplete="off"
        name="message"
        id="message"
        type="text"
        placeholder={
          isCurrentUserBlocked || isRecieverBlocked
            ? 'Blocked'
            : 'Type a message'
        }
        className={`flex-1 bg-black/50 rounded-xl p-4 border-none outline-none text-white text-lg ${
          isCurrentUserBlocked || isRecieverBlocked
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : ''
        }`}
        value={message.message}
        onChange={handleMessage}
        disabled={isCurrentUserBlocked || isRecieverBlocked}
      />
      <div
        className={`${
          isCurrentUserBlocked || isRecieverBlocked
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : ''
        }`}
      >
        <img
          src="./emoji.png"
          alt=""
          className="h-5 w-5 cursor-pointer"
          onClick={() => setIsOpenEmoji((prev) => !prev)}
        />
        {/* Emoji Picker */}
        <div
          className={`absolute bottom-24 right-0 ${
            isOpenEmoji ? 'block' : 'hidden'
          }`}
        >
          <EmojiPicker onEmojiClick={handleEmoji} />
        </div>
      </div>
      <button
        className={`bg-[#3F7670] text-white p-[10px_20px] rounded-md cursor-pointer ${
          isCurrentUserBlocked || isRecieverBlocked
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : ''
        }`}
        onClick={handleSend}
        disabled={isCurrentUserBlocked || isRecieverBlocked}
      >
        Send
      </button>
    </div>
  );
};

// Export
export default MessageInput;
