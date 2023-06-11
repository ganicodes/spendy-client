import Expense from "../pages/ledger/components/Expense";
import Income from "../pages/ledger/components/Income";
import Summary from "../pages/ledger/components/Summary";

export const tabs = {
  dashboard: [],
  ledger: ["Summary", "Expense", "Income"],
  reports: [],
};

export const renderActiveTab = () => ({
  Summary: <Summary />,
  Expense: <Expense />,
  Income: <Income />,
});
