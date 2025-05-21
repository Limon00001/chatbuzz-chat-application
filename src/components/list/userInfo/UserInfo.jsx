/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { LogOut, SquarePen } from 'lucide-react';
import { toast } from 'react-toastify';

// Internal Imports
import { auth } from '../../../lib/firebase';
import { useUserStore } from '../../../lib/userStore';

// UserInfo Component
const UserInfo = ({ onProfileClick }) => {
  const { currentUser } = useUserStore();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="relative flex justify-between items-center p-5">
      <div className="flex items-center gap-5">
        <img
          src={currentUser?.profileImage || './profile.png'}
          alt={currentUser?.username || 'Profile picture'}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2>{currentUser?.username}</h2>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onProfileClick}
          className="cursor-pointer bg-black/30 p-2 rounded-full"
        >
          <SquarePen className="w-5 h-5" />
        </button>
        <button
          onClick={handleSignOut}
          className="cursor-pointer text-red-500/70 bg-black/30 p-2 rounded-full"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Export
export default UserInfo;
