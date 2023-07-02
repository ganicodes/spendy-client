import Expense from "../pages/ledger/container/Expense";
import Income from "../pages/ledger/container/Income";
import Summary from "../pages/ledger/container/Summary";

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
