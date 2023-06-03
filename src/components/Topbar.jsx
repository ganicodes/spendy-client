import Logo from "../assets/react.svg";
const Topbar = () => {
  return (
    <div className="flex md:block top-0 border border-gray-500">
      <div className="md:hidden">
        <img src={Logo} alt="logo" />
      </div>
      Topbar
    </div>
  );
};

export default Topbar;
