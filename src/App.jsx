import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Dashboard from "./pages/dashboard/container/Dashboard";
import Ledger from "./pages/ledger/container/Ledger";
import Reports from "./pages/reports/container/Reports";
import RouteConstants from "./common/RouteConstants";
import Topbar from "./components/shared/Topbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function App() {
  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <div className="dark:bg-dark dark:text-slate-100 md:flex">
      <Router>
        <Navbar />
        <div className="w-full md:flex md:flex-col">
          <Topbar />
          <Routes>
            <Route
              exact
              path={RouteConstants.Dashboard}
              Component={Dashboard}
            />
            <Route exact path={RouteConstants.Ledger} Component={Ledger} />
            <Route exact path={RouteConstants.Reports} Component={Reports} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
