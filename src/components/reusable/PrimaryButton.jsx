import PropTypes from "prop-types";
const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer rounded bg-primary px-2 py-2 font-semibold text-gray-50 hover:bg-primaryVariant "
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
