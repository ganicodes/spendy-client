import { useState } from "react";
import Tabs from "../../../components/reusable/Tabs";
import { renderActiveTab, tabs } from "../../../common/TabsConstants";

const Ledger = () => {
  const [activeTab, setActiveTab] = useState(0);
  const toggleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="max-h-full overflow-y-hidden">
      <Tabs tablist={tabs.ledger} toggle={toggleActiveTab} />
      <div className="">{renderActiveTab()[tabs.ledger[activeTab]]}</div>
    </div>
  );
};

export default Ledger;
