// This is a reusable alert component - just pass variant & message props and use it
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const alertClasses = {
  error: "bg-red-300 text-red-800 dark:bg-gray-800 dark:text-red-400",
  info: "bg-blue-300 text-blue-800 dark:bg-gray-800 dark:text-blue-400",
  warning:
    "bg-yellow-300 text-yellow-800 dark:bg-gray-800 dark:text-yellow-400",
  success: "bg-green-300 text-green-800 dark:bg-gray-800 dark:bg-green-400",
};

const Alert = ({ message, variant }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  // If showAlert is false the component will return null and stop here
  if (!showAlert) {
    return null;
  }

  return (
    <div
      className={`absolute left-[50%] top-[50px] mx-auto mt-4 w-fit -translate-x-[50%] rounded p-4 text-sm transition-all duration-3000 ease-linear ${alertClasses[variant]}`}
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
};

const AdvancedAlert = ({ message, variant }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAction = () => {
    setShowAlert(false);
  };

  // If showAlert is false the component will return null and stop here
  if (!showAlert) {
    return null;
  }

  return (
    <div
      className={`absolute left-[50%] top-[50px] mx-auto mb-2 mt-4 flex w-fit -translate-x-[50%] rounded p-4 text-sm transition-all duration-3000 ease-linear ${alertClasses[variant]}`}
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">{variant}</span>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        onClick={handleCloseAction}
        type="button"
        className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5"
        data-dismiss-target="#alert-1"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
AdvancedAlert.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export { AdvancedAlert };
export default Alert;
