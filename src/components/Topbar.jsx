import { useState } from "react";
import Logo from "../assets/react.svg";
const Topbar = () => {
  const [notification, setNotification] = useState(false);

  const notify = () => {
    setNotification((prev) => !prev);
  };

  return (
    <div className="top-0 flex items-center border p-2  md:block ">
      <div className="flex items-center">
        <ion-icon name="menu"></ion-icon>
        <div className="ml-2 flex w-1/2 items-center gap-2">
          <ion-icon name="search-outline"></ion-icon>
          <input type="text" placeholder="Search..." className=" w-full p-1" />
        </div>
        <div className="ml-3 flex  w-1/2 items-center justify-between">
          <span onClick={notify} className="w-1/2 gap-2">
            {notification ? (
              <div className="text-sm">
                <ion-icon name="notifications-off-outline"></ion-icon>
              </div>
            ) : (
              <div className="text-sm">
                <ion-icon name="notifications-outline"></ion-icon>
              </div>
            )}
          </span>
          <div className="flex justify-between">
            <img
              className="ml-2 mr-2 h-8 w-8 rounded-full bg-gray-600"
              src="https://atultingre.netlify.app/images/my-avatar1.png"
              alt="Profile"
            />
            <select
              name=""
              id=""
              className="flex justify-end border-none bg-inherit p-1 outline-none">
              <option value="username" className="text-black">
                Atul Tingre
              </option>
              <option value="Your Profile" className="text-black">
                Your Profile
              </option>

              <option value="Your Profile" className="text-black">
                Sign Out
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
