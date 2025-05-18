/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Detail Component
const Detail = () => {
  return (
    <section className="flex-1">
      <div className="flex flex-col items-center gap-5 p-[30px_20px] border-b border-b-gray-700">
        <img src="./avatar.png" alt="" className="w-25 h-25 rounded-full" />
        <h2>John Doe</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="flex flex-col gap-8 p-5">
        <div>
          <div className="flex items-center justify-between">
            <span>Chat Settings</span>
            <img
              src="./arrowUp.png"
              alt=""
              className="h-7 w-7 p-2 bg-black/30 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span>Privacy Settings</span>
            <img
              src="./arrowUp.png"
              alt=""
              className="h-7 w-7 p-2 bg-black/30 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span>Shared Photos</span>
            <img
              src="./arrowDown.png"
              alt=""
              className="h-7 w-7 p-2 bg-black/30 rounded-full cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <img
                  src="./avatar.png"
                  alt=""
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="text-sm text-gray-200 font-normal">
                  Photo Name
                </span>
              </div>
              <img
                src="./download.png"
                alt=""
                className="h-7 w-7 p-[6px] cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button className="w-full bg-red-600/80 hover:bg-red-600/60 py-2 px-4 border-none rounded-full transition-colors duration-300 ease-in-out cursor-pointer">
          Block User
        </button>
      </div>
    </section>
  );
};

// Export
export default Detail;
