import PropTypes, { object } from "prop-types";
const Select = ({ placeholder, options }) => {
  return (
    <div className="mr-4 inline-block w-[100%]">
      <select
        id="countries"
        required
        placeholder="Select here"
        defaultValue={0}
        className="block w-[99%] rounded border border-primary p-2.5 text-sm
      focus:border-primary  focus:outline-primary focus:ring-primary dark:border-primary dark:bg-gray-700 dark:text-white
      dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary"
      >
        <option disabled value={0}>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
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
};
export default Select;
