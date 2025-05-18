/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

import { useState } from 'react';

// UserInfo Component
const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-between items-center p-5">
      <div className="flex items-center gap-5">
        <img
          src="./avatar.png"
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2>John Doe</h2>
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
        <div className="absolute top-16 right-2 w-30 p-2 bg-teal-600/50 backdrop-blur-md rounded-lg shadow-lg z-50">
          <p className="cursor-pointer text-sm font-normal tracking-wider">
            Edit Profile
          </p>
          <hr className="my-2 text-gray-400" />
          <p className="cursor-pointer text-sm font-normal">Logout</p>
        </div>
      )}
    </div>
  );
};

// Export
export default UserInfo;
