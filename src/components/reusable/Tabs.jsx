import PropTypes, { any } from "prop-types";
import { useState } from "react";

const Tabs = ({ tablist, toggle }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <ul className="-mb-px flex flex-wrap">
          {tablist.map((tab, index) => (
            <li
              key={index}
              className="mr-2 cursor-default"
              onClick={() => {
                toggle(index);
                setActiveTab(index);
              }}
            >
              <span
                className={
                  activeTab === index
                    ? "active inline-block rounded-t-lg border-b-2 border-primary p-3 text-primary dark:border-primary dark:text-primary"
                    : "inline-block rounded-t-lg border-b-2 border-transparent p-3 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                }
              >
                {tab}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

Tabs.propTypes = {
  tablist: PropTypes.arrayOf(any).isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Tabs;
