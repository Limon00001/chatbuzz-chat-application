/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import ConnectedUsers from './connectedUsers/ConnectedUsers';
import SearchToolbar from './searchToolbar/SearchToolbar';

// ChatList Component
const ChatList = () => {
  return (
    <div className="flex-1 overflow-y-scroll">
      {/* Search Toolbar */}
      <SearchToolbar />

      {/* Connected Users */}
      <ConnectedUsers />
    </div>
  );
};

// Export
export default ChatList;
