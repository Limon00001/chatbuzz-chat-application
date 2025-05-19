/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 17 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal imports
import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import List from './components/list/List';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';

// App Component
const App = () => {
  const user = true;

  return (
    <main className="container flex overflow-hidden">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}

      <Notification />
    </main>
  );
};

// Export
export default App;
