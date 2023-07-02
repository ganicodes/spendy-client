import PropTypes, { object } from "prop-types";
const Select = ({
  placeholder,
  options,
  onSelect,
  register,
  name,
  required = false,
}) => {
  return (
    <div className="mr-4 inline-block w-[100%]">
      <select
        id={name}
        name={name}
        required
        placeholder="Select here"
        defaultValue={""}
        // onChange={onSelect}
        {...register(name, { required, onChange: onSelect })}
        className="block w-[99%] rounded border border-primary p-2.5 text-sm
      focus:border-primary  focus:outline-primary focus:ring-primary dark:border-primary dark:bg-gray-700 dark:text-white
      dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary"
      >
        <option disabled value={""}>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(object),
  onSelect: PropTypes.func,
  name: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
};
export default Select;
