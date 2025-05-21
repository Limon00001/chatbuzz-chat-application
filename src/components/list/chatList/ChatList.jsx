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
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter((chat) => {
    if (!searchTerm.trim()) return true; // Show all chats when no search term

    return chat?.user?.username // Changed from name to username
      ?.toLowerCase()
      ?.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex-1 overflow-y-scroll">
      {/* Search Toolbar */}
      <SearchToolbar
        addMode={addMode}
        onAddMode={setAddMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Connected Users */}
      <ConnectedUsers chats={filteredChats} setChats={setChats} />

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
