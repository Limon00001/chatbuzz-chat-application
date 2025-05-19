/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// SearchToolbar Component
const SearchToolbar = ({ addMode, onAddMode }) => {
  return (
    <div className="flex items-center p-5 gap-5">
      <div className="flex-1 flex items-center gap-5 bg-black/50 rounded-xl p-2">
        <img src="./search.png" alt="" className="h-5 w-5" />
        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-white"
          placeholder="Search"
        />
      </div>
      <img
        src={addMode ? './minus.png' : './plus.png'}
        alt="add user"
        className="h-9 w-9 cursor-pointer bg-black/50 p-[10px] rounded-xl"
        onClick={() => onAddMode((prev) => !prev)}
      />
    </div>
  );
};

// Export
export default SearchToolbar;
