/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// UserInfo Component
const UserInfo = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <div className="flex items-center gap-5">
        <img
          src="./avatar.png"
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2>John Doe</h2>
      </div>
      <div className="flex gap-5">
        <img src="./more.png" alt="" className="h-5 w-5 cursor-pointer" />
        <img src="./video.png" alt="" className="h-5 w-5 cursor-pointer" />
        <img src="./edit.png" alt="" className="h-5 w-5 cursor-pointer" />
      </div>
    </div>
  );
};

// Export
export default UserInfo;
