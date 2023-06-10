import { useState } from "react";
const Topbar = () => {
  const [notification, setNotification] = useState(false);

  const notify = () => {
    setNotification((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="cursor-pointer text-xl font-bold md:hidden">
        <ion-icon name="menu"></ion-icon>
      </div>
      <div className="ml-2 basis-3/4">
        {/* <ion-icon
          style={{ display: "inline-block", marginRight: "8px" }}
          name="search-outline"
        ></ion-icon> */}
        <input
          type="text"
          placeholder="Search..."
          className=" w-full p-1 focus:outline-primary"
        />
      </div>
      <div className="flex items-center justify-between">
        <div onClick={notify} className="mr-4">
          {notification ? (
            <div className="ml-2">
              <ion-icon name="notifications-off-outline"></ion-icon>
            </div>
          ) : (
            <div className="ml-2">
              <ion-icon name="notifications"></ion-icon>
            </div>
          )}
        </div>
        <img
          className="mr-2 h-8 w-8 rounded-full bg-gray-600"
          src="https://atultingre.netlify.app/images/my-avatar1.png"
          alt="Profile"
        />
        <select name="" id="" className="border-none p-1 outline-none">
          <option className="" value="username">
            Atul Tingre
          </option>
          <option value="profile" className="">
            Your Profile
          </option>
          <option value="signout" className="">
            Sign Out
          </option>
        </select>
      </div>
    </div>
  );
};

export default Topbar;
