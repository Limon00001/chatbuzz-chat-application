/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

// MessageInput Component
const MessageInput = () => {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [message, setMessage] = useState({
    message: '',
  });

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

  return (
    <div className="relative flex items-center justify-between p-5 gap-5 border-t border-t-gray-700 mt-auto">
      <div className="flex items-center gap-5">
        <img src="./img.png" alt="" className="h-5 w-5 gap-5" />
        <img src="./camera.png" alt="" className="h-5 w-5 gap-5" />
        <img src="./mic.png" alt="" className="h-5 w-5 gap-5" />
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
        placeholder="Type a message..."
        className="flex-1 bg-black/50 rounded-xl p-4 border-none outline-none text-white text-lg"
        value={message.message}
        onChange={handleMessage}
      />
      <div>
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
        type="submit"
        className="bg-[#3F7670] text-white p-[10px_20px] rounded-md cursor-pointer"
      >
        Send
      </button>
    </div>
  );
};

// Export
export default MessageInput;
