/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 19 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

// Internal Imports
import { db } from '../../../../lib/firebase';
import { useUserStore } from '../../../../lib/userStore';

// User Modal Component
const AddUser = ({ addMode, onAddMode }) => {
  // State
  const [inputValue, setInputValue] = useState({
    name: '',
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(null);
  const { currentUser } = useUserStore();

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
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchName = inputValue.name.trim().toLowerCase();

    if (!searchName) {
      toast.error('Please enter a username');
      return;
    }

    setLoading(true);

    try {
      const userRef = collection(db, 'users');
      // Get all users
      const querySnapshot = await getDocs(userRef);

      if (querySnapshot.empty) {
        toast.error('No users found');
        setUser(null);
      } else {
        const users = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();

          if (userData.username.toLowerCase().includes(searchName)) {
            users.push({ ...userData, docId: doc.id });
          }
        });

        if (users.length === 0) {
          toast.error('User not found');
          setUser(null);
        } else {
          users.sort((a, b) => {
            const aExact = a.username.toLowerCase() === searchName;
            const bExact = b.username.toLowerCase() === searchName;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            return 0;
          });

          setUser(users[0]);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error(error.message || 'Failed to search for user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle add user
  const handleAdd = async () => {
    if (!user || !currentUser) {
      toast.error('Something went wrong');
      return;
    }

    // Check if chat already exists
    try {
      const userChatsDoc = await getDoc(doc(db, 'userchats', currentUser.id));
      const existingChats = userChatsDoc.data()?.chats || [];

      const chatExists = existingChats.some(
        (chat) => chat.recieverId === user.id,
      );
      if (chatExists) {
        toast.error('Chat already exists with this user');
        onAddMode(false);
        return;
      }

      setLoading(true);

      // Create new chat document
      const chatRef = collection(db, 'chats');
      const newChatRef = doc(chatRef);

      // Initialize chat document
      await setDoc(newChatRef, {
        messages: [],
        participants: [currentUser.id, user.id],
        createdAt: serverTimestamp(),
      });

      // Initialize or update userchats for both users
      const userChatsRef = collection(db, 'userchats');

      // Create userchats document if it doesn't exist
      const initUserChat = async (userId) => {
        const userChatDoc = doc(userChatsRef, userId);
        const docSnap = await getDoc(userChatDoc);

        if (!docSnap.exists()) {
          await setDoc(userChatDoc, { chats: [] });
        }
      };

      // Initialize chat documents for both users
      await Promise.all([initUserChat(currentUser.id), initUserChat(user.id)]);

      // Update both users' chat lists
      await Promise.all([
        updateDoc(doc(userChatsRef, user.id), {
          chats: arrayUnion({
            recieverId: currentUser.id,
            chatId: newChatRef.id,
            lastMessage: '',
            updatedAt: Date.now(),
          }),
        }),
        updateDoc(doc(userChatsRef, currentUser.id), {
          chats: arrayUnion({
            recieverId: user.id,
            chatId: newChatRef.id,
            lastMessage: '',
            updatedAt: Date.now(),
          }),
        }),
      ]);

      toast.success('User added successfully');
      setInputValue({ name: '' }); // Reset search input
      setUser(null); // Reset selected user
      onAddMode(false);
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error(error.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
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
          <form onSubmit={handleSearch} className="flex gap-5">
            <input
              type="text"
              name="name"
              className="flex-6 p-4 rounded-lg border-none outline-none bg-black/80"
              placeholder="Search for a user"
              autoComplete="off"
              value={inputValue.name}
              onChange={handleFormChange}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 text-white bg-black py-1 px-4 rounded-lg border-none cursor-pointer ${
                loading
                  ? 'opacity-50 cursor-not-allowed pointer-events-none'
                  : ''
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin m-auto mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </>
              ) : (
                'Search'
              )}
            </button>
          </form>
          {user && (
            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center gap-4">
                <img
                  src={user.profileImage || './profile.png'}
                  alt={user.username}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <span>{user.username}</span>
              </div>
              <button
                onClick={handleAdd}
                className="text-white bg-black py-1 px-4 rounded-lg border-none cursor-pointer"
              >
                Add User
              </button>
            </div>
          )}
        </div>
      </>
    </>
  );
};

// Export
export default AddUser;
