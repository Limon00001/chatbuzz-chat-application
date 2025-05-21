/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 17 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External imports
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

// Internal imports
import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import List from './components/list/List';
import Loading from './components/Loading';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import Profile from './components/profile/Profile';
import { useChatStore } from './lib/chatStore';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';

// App Component
const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId, showDetail } = useChatStore();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading && auth.currentUser) {
    return <Loading fullScreen />;
  }

  return (
    <main className="container flex overflow-hidden">
      {currentUser ? (
        showProfile ? (
          <Profile onBack={() => setShowProfile(false)} />
        ) : (
          <>
            <List onProfileClick={() => setShowProfile(true)} />
            {chatId && <Chat />}
            {chatId && showDetail && <Detail />}
          </>
        )
      ) : (
        <Login />
      )}

      <Notification />
    </main>
  );
};

// Export
export default App;
