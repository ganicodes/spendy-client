import { Link } from "react-router-dom";
import RouteConstants from "../common/RouteConstants";

const navLinks = [
  {
    name: "home-outline",
    title: "Dashboard",
    link: RouteConstants.Dashboard,
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
    name: "pie-chart-outline",
    title: "Reports",
    link: RouteConstants.Reports,
  },
  {
    name: "wallet-outline",
    title: "Ledger",
    link: RouteConstants.Ledger,
  },
  {
    name: "settings-outline",
    title: "Settings",
    link: RouteConstants.Settings,
  },
];
const Navbar = () => {
  return (
    <div
      className="h-screen hidden md:block md:w-1/5"
      style={{
        backgroundImage:
          "linear-gradient(to left bottom, #743cec, #763fec, #7943ec, #7b46eb, #7d49eb, #814eeb, #8454eb, #8859eb, #8d62ea, #936aea, #9872e9, #9d7ae8)",
      }}>
      <ul className="mt-20">
        {navLinks.map((navlink, index) => (
          <li
            key={index}
            className="flex items-center  pl-2 pr-2 ml-2 mr-2 text-white hover:bg-[#5401e7] rounded-lg text-lg ">
            <div className="m-2 text-xl font-semibold hover:font-bold">
              <ion-icon name={navlink.name}></ion-icon>
            </div>
            <Link to={navlink.link} className="font-semibold hover:font-bold">
              {navlink.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
