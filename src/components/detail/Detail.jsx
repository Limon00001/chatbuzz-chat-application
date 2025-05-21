/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

// Internal Imports
import { useChatStore } from '../../lib/chatStore';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';

// Detail Component
const Detail = () => {
  const { currentUser } = useUserStore();
  const { user, isCurrentUserBlocked, isRecieverBlocked, changeBlock } =
    useChatStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, 'users', currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });

      changeBlock();
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <section className="flex-1 flex flex-col h-full">
      <div className="flex flex-col items-center gap-5 p-[30px_20px] border-b border-b-gray-700">
        <img
          src={user?.profileImage || './profile.png'}
          alt=""
          className="w-25 h-25 rounded-full"
        />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="flex flex-col gap-8 p-5 mt-auto">
        <p className="text-center text-red-500">
          {isCurrentUserBlocked
            ? 'This user has blocked you!'
            : isRecieverBlocked
            ? 'You have blocked this user!'
            : ''}
        </p>
        <button
          onClick={handleBlock}
          className={`w-full bg-red-600/80 hover:bg-red-600/60 py-2 px-4 border-none rounded-full transition-colors duration-300 ease-in-out cursor-pointer ${
            isCurrentUserBlocked
              ? 'opacity-50 cursor-not-allowed pointer-events-none'
              : ''
          }`}
        >
          {isCurrentUserBlocked
            ? 'Unblock'
            : isRecieverBlocked
            ? 'Block'
            : 'Unblock'}
        </button>
      </div>
    </section>
  );
};

// Export
export default Detail;
