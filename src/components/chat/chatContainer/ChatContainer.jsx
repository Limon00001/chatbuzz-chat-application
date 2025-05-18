/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useEffect, useRef } from 'react';

// ChatContainer Component
const ChatContainer = () => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="flex flex-col gap-5 flex-1 p-5 overflow-y-scroll overflow-x-hidden">
      <div className="message">
        <img
          src="./avatar.png"
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col flex-1 gap-1">
          <p className="p-4 bg-black/30 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            omnis fuga earum, corrupti fugit autem provident accusantium.
            Consequuntur velit sed consequatur eum quidem sit repudiandae fuga
            necessitatibus aspernatur dicta omnis, tempora, possimus non est,
            exercitationem nihil dolorem nesciunt nam totam.
          </p>
          <span className="text-sm">1 min ago</span>
        </div>
      </div>
      <div className="message own">
        <div>
          <p className="ownText p-4 bg-black/30 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            omnis fuga earum, corrupti fugit autem provident accusantium.
            Consequuntur velit sed consequatur eum quidem sit repudiandae fuga
            necessitatibus aspernatur dicta omnis, tempora, possimus non est,
            exercitationem nihil dolorem nesciunt nam totam.
          </p>
          <span className="text-sm">1 min ago</span>
        </div>
      </div>
      <div className="message">
        <img
          src="./avatar.png"
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <p className="p-4 bg-black/30 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            omnis fuga earum, corrupti fugit autem provident accusantium.
            Consequuntur velit sed consequatur eum quidem sit repudiandae fuga
            necessitatibus aspernatur dicta omnis, tempora, possimus non est,
            exercitationem nihil dolorem nesciunt nam totam.
          </p>
          <span className="text-sm">1 min ago</span>
        </div>
      </div>
      <div className="message own">
        <div>
          <p className="ownText p-4 bg-black/30 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            omnis fuga earum, corrupti fugit autem provident accusantium.
            Consequuntur velit sed consequatur eum quidem sit repudiandae fuga
            necessitatibus aspernatur dicta omnis, tempora, possimus non est,
            exercitationem nihil dolorem nesciunt nam totam.
          </p>
          <span className="text-sm">1 min ago</span>
        </div>
      </div>
      <div className="message">
        <img
          src="./avatar.png"
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <p className="p-4 bg-black/30 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            omnis fuga earum, corrupti fugit autem provident accusantium.
            Consequuntur velit sed consequatur eum quidem sit repudiandae fuga
            necessitatibus aspernatur dicta omnis, tempora, possimus non est,
            exercitationem nihil dolorem nesciunt nam totam.
          </p>
          <span className="text-sm">1 min ago</span>
        </div>
      </div>
      <div className="message own">
        <div>
          <img
            src="./avatar.png"
            alt=""
            className="w-[100%] h-[300px] rounded-xl object-cover mb-1"
          />
          <p className="ownText p-4 bg-black/30 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            omnis fuga earum, corrupti fugit autem provident accusantium.
            Consequuntur velit sed consequatur eum quidem sit repudiandae fuga
            necessitatibus aspernatur dicta omnis, tempora, possimus non est,
            exercitationem nihil dolorem nesciunt nam totam.
          </p>
          <span className="text-sm">1 min ago</span>
        </div>
      </div>
      <div ref={messagesEndRef}></div>
    </section>
  );
};

// Export
export default ChatContainer;
