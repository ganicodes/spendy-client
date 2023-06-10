import { Link, useLocation } from "react-router-dom";
import RouteConstants from "../../common/RouteConstants";

const navLinks = [
  {
    name: "home-outline",
    title: "Dashboard",
    link: RouteConstants.Dashboard,
  },
  {
    name: "wallet-outline",
    title: "Ledger",
    link: RouteConstants.Ledger,
  },
  {
    name: "pie-chart-outline",
    title: "Reports",
    link: RouteConstants.Reports,
  },
  {
    name: "people-outline",
    title: "Team",
    link: RouteConstants.Team,
  },
  {
    name: "folder-outline",
    title: "Projects",
    link: RouteConstants.Projects,
  },
  {
    name: "calendar-outline",
    title: "Calender",
    link: RouteConstants.Calender,
  },
  {
    name: "documents-outline",
    title: "Documents",
    link: RouteConstants.Documents,
  },
  {
    name: "settings-outline",
    title: "Settings",
    link: RouteConstants.Settings,
  },
];

const Toggle = () => {
  return (
    <label className=" relative top-4 ml-4 inline-flex cursor-pointer items-center">
      <input type="checkbox" value="" className="peer sr-only" />
      <div className="peer h-6 w-11 rounded-full bg-white after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-primary after:transition-all after:content-[''] peer-checked:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary"></div>
      <span className="ml-3 text-white">Dark Mode</span>
    </label>
  );
};

const Navbar = () => {
  let location = useLocation().pathname;

  return (
    <div
      className="hidden h-screen bg-primary md:block md:w-[280px]"
      style={{
        backgroundImage:
          "linear-gradient(to left bottom, #743cec, #763fec, #7943ec, #7b46eb, #7d49eb, #814eeb, #8454eb, #8859eb, #8d62ea, #936aea, #9872e9, #9d7ae8)",
      }}
    >
      <div className=" relative top-[50px]">
        {navLinks.map((navlink, index) => (
          <Link
            to={navlink.link}
            key={index}
            className={`text-md mr-0.5 flex cursor-pointer items-center justify-stretch gap-2 rounded-sm px-1  hover:bg-white hover:text-primary ${
              location === navlink.link ? "bg-white text-primary" : "text-white"
            }`}
          >
            <div className="m-2">
              <ion-icon name={navlink.name}></ion-icon>
            </div>
            <span>{navlink.title}</span>
          </Link>
        ))}
        <Toggle />
      </div>
    </div>
  );
};

export default Navbar;
