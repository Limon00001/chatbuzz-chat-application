/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// ChatHeader Component
const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-5 border-b border-b-gray-700">
      <div className="flex items-center gap-5">
        <img
          src="./avatar.png"
          alt=""
          className="w-13 h-13 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="font-bold text-lg">John Doe</span>
          <p className="text-sm font-normal text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <img src="./phone.png" alt="" className="h-5 w-5 cursor-pointer" />
        <img src="./video.png" alt="" className="h-5 w-5 cursor-pointer" />
        <img src="./info.png" alt="" className="h-5 w-5 cursor-pointer" />
      </div>
    </div>
  );
};

// Export
export default ChatHeader;
