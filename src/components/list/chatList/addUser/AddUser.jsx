/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 19 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useEffect, useRef, useState } from 'react';

// User Modal Component
const AddUser = ({ addMode, onAddMode }) => {
  // State
  const [formData, setFormData] = useState({
    name: '',
  });
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current?.contains(event.target)) {
        onAddMode(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onAddMode]);

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/60 transition-colors duration-300 backdrop-blur-sm z-40"></div>

        {/* Modal */}
        <div
          ref={popupRef}
          className={`absolute right-0 left-0 top-0 bottom-0 h-max w-1/3 m-auto p-8 rounded-lg bg-teal-600/80 backdrop-blur-md z-50 transition-all delay-300 duration-500 ease-in-out transform-gpu ${
            addMode
              ? 'translate-x-0 opacity-100'
              : '-translate-x-full opacity-0'
          }`}
        >
          <form className="flex gap-5">
            <input
              type="text"
              name="name"
              className="flex-6 p-4 rounded-lg border-none outline-none bg-black/80"
              placeholder="Search for a user"
              autoComplete="off"
              value={formData.name}
              onChange={handleFormChange}
            />
            <button
              type="submit"
              className="flex-1 text-white bg-black py-1 px-4 rounded-lg border-none cursor-pointer"
            >
              Search
            </button>
          </form>
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center gap-4">
              <img
                src="./avatar.png"
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              <span>John Doe</span>
            </div>
            <button className="text-white bg-black py-1 px-4 rounded-lg border-none cursor-pointer">
              Add User
            </button>
          </div>
        </div>
      </>
    </>
  );
};

// Export
export default AddUser;
