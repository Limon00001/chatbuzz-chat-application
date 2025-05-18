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

// App Component
const App = () => {
  return (
    <main className="container flex">
      <List />
      <Chat />
      <Detail />
    </main>
  );
};

// Export
export default App;
