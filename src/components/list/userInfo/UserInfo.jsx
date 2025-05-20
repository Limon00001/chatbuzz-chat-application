/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useEffect, useRef, useState } from 'react';

// Internal Imports
import { auth } from '../../../lib/firebase';
import { useUserStore } from '../../../lib/userStore';

// UserInfo Component
const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex justify-between items-center p-5">
      <div className="flex items-center gap-5">
        <img
          src={currentUser?.profileImage || './profile.png'}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2>{currentUser?.username}</h2>
      </div>
      <div className="flex gap-5">
        <img
          src="./more.png"
          alt=""
          className="h-5 w-5 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <img src="./video.png" alt="" className="h-5 w-5 cursor-pointer" />
        <img src="./edit.png" alt="" className="h-5 w-5 cursor-pointer" />
      </div>
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute top-16 right-2 w-30 p-2 bg-teal-600/50 backdrop-blur-md rounded-lg shadow-lg z-50"
        >
          <button className="cursor-pointer text-sm font-normal tracking-wider">
            Edit Profile
          </button>
          <hr className="my-2 text-gray-400" />
          <button
            onClick={() => auth.signOut()}
            className="cursor-pointer text-sm font-normal"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// Export
export default UserInfo;
