import PropTypes, { object } from "prop-types";
const Select = ({ label, options }) => {
  return (
    <div className="mr-4 inline-block">
      <select
        id="countries"
        required
        placeholder="Select here"
        className="block rounded border border-primary p-2.5 text-sm
      focus:border-primary focus:outline-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary"
      >
        <option selected>{label}</option>
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
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(object),
};
export default Select;
