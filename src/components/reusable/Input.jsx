import PropTypes from "prop-types";
const Input = ({
  type,
  placeholder,
  id,
  name,
  onInputChange,
  register,
  required = false,
}) => {
  return type === "number" ? (
    <input
      type="number"
      name={name}
      id={id}
      placeholder={placeholder ? placeholder : ""}
      required={required}
      onChange={onInputChange}
      {...register(name, {
        required,
        min: {
          value: 1,
          message: "Minimum 1",
        },
        valueAsNumber: true,
      })}
      className="h-[40px] w-[100%] rounded border border-primary px-2 [appearance:textfield] focus:outline-primary dark:bg-gray-700  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  ) : type === "text" ? (
    <input
      type="text"
      name={name}
      id={id}
      placeholder={placeholder ? placeholder : ""}
      required={required}
      onChange={onInputChange}
      {...register(name, {
        required,
        maxLength: {
          value: 30,
          message: "Maximum 30 characters are allowed",
        },
      })}
      className="h-[40px] w-[100%] rounded border border-primary px-2 focus:outline-primary dark:bg-gray-700 "
    />
  ) : null;
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  register: PropTypes.func,
};

export default Input;
