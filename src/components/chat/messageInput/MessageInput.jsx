/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// MessageInput Component
const MessageInput = () => {
  return (
    <div className="flex items-center justify-between p-5 gap-5 border-t border-t-gray-700">
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
        value=""
        type="text"
        placeholder="Type a message..."
        className="flex-1 bg-black/50 rounded-xl p-4 border-none outline-none text-white text-lg"
      />
      <div>
        <img src="./emoji.png" alt="" className="h-5 w-5 cursor-pointer" />
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
