/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useState } from 'react';

// Internal Imports
import AddUser from './addUser/AddUser';
import ConnectedUsers from './connectedUsers/ConnectedUsers';
import SearchToolbar from './searchToolbar/SearchToolbar';

// ChatList Component
const ChatList = () => {
  // State
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="flex-1 overflow-y-scroll">
      {/* Search Toolbar */}
      <SearchToolbar addMode={addMode} onAddMode={setAddMode} />

      {/* Connected Users */}
      <ConnectedUsers />

      {/* User Modal */}
      {
        /* User Modal */
        addMode && <AddUser addMode={addMode} onAddMode={setAddMode} />
      }
    </div>
  );
};

// Export
export default ChatList;
