/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { BadgeInfo } from 'lucide-react';

// Internal Imports
import { useChatStore } from '../../../lib/chatStore';

// ChatHeader Component
const ChatHeader = () => {
  const { user, showDetail, toggleDetail } = useChatStore();

  return (
    <div className="flex items-center justify-between p-5 border-b border-b-gray-700">
      <div className="flex items-center gap-5">
        <img
          src={user?.profileImage || './profile.png'}
          alt=""
          className="w-13 h-13 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="font-bold text-lg">{user?.username}</span>
          <p className="text-sm font-normal text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <BadgeInfo
          className={`h-7 w-7 cursor-pointer transition-colors duration-200 ${
            showDetail ? 'text-teal-500' : 'text-gray-400'
          }`}
          onClick={toggleDetail}
        />
      </div>
    </div>
  );
};

// Export
export default ChatHeader;
