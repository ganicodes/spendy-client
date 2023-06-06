import { useState } from "react";
import Logo from "../assets/react.svg";
const Topbar = () => {
  const [notification, setNotification] = useState(false);

  const notify = () => {
    setNotification(!notification);
  };

  return (
    <div className="flex md:block top-0 border border-gray-500 p-2 bg-[#5401e7] text-white items-center justify-center">
      <div className="md:hidden">
        <img src={Logo} alt="logo" className="" />
      </div>
      <div className="flex items-center">
        <div className="flex justify-center items-center gap-2 ml-2 w-1/2">
          <ion-icon name="search-outline"></ion-icon>
          <input
            type="text"
            placeholder="Search..."
            className="outline-none width-100 p-1 border-none bg-inherit"
          />
        </div>
        <div className="flex w-1/2 justify-end gap-1 ml-3 mr-3">
          <button onClick={notify} className="w-1/2 gap-2">
            {notification ? (
              <div className="text-sm">
                <ion-icon name="notifications-off-outline"></ion-icon>
              </div>
            ) : (
              <div className="text-sm">
                <ion-icon name="notifications-outline"></ion-icon>
              </div>
            )}
          </button>
          <img
            className="w-8 h-8 ml-2 mr-2 rounded-full bg-gray-600"
            src="https://atultingre.netlify.app/images/my-avatar1.png"
            alt="Profile"
          />
          <select
            name=""
            id=""
            className="flex p-1 justify-end outline-none border-none bg-inherit">
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
  );
};

export default Topbar;
