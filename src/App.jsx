import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RouteConstants from "./common/RouteConstants";
import Alert from "./components/reusable/Alert";
import Navbar from "./components/shared/Navbar";
import Topbar from "./components/shared/Topbar";
import Dashboard from "./pages/dashboard/container/Dashboard";
import Ledger from "./pages/ledger/container/Ledger";
import Reports from "./pages/reports/container/Reports";

export default function App() {
  const theme = useSelector((state) => state.theme.theme);
  const { showAlert, variant, message } = useSelector((state) => state.alert);
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
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
          {showAlert && <Alert variant={variant} message={message} />}
        </div>
      </Router>
    </div>
  );
}
