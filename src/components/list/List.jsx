/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import ChatList from './chatList/ChatList';
import UserInfo from './userInfo/UserInfo';

// List Component
const List = ({ onProfileClick }) => {
  return (
    <section className="flex-1 flex flex-col">
      <UserInfo onProfileClick={onProfileClick} />
      <ChatList />
    </section>
  );
};

// Export
export default List;
