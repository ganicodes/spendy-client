import { Link } from "react-router-dom";
import RouteConstants from "../common/RouteConstants";

const navLinks = [
  {
    title: "Dashboard",
    link: RouteConstants.Dashboard,
  },
  {
    title: "Ledger",
    link: RouteConstants.Ledger,
  },
  {
    title: "Reports",
    link: RouteConstants.Reports,
  },
];
const Navbar = () => {
  return (
    <div
      className="h-screen hidden md:block md:w-1/5"
      style={{
        backgroundImage:
          "linear-gradient(to left bottom, #743cec, #763fec, #7943ec, #7b46eb, #7d49eb, #814eeb, #8454eb, #8859eb, #8d62ea, #936aea, #9872e9, #9d7ae8)",
      }}
    >
      <ul>
        {navLinks.map((navlink, index) => (
          <li key={index}>
            <Link to={navlink.link}>{navlink.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
