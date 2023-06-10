import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Dashboard from "./pages/dashboard/container/Dashboard";
import Ledger from "./pages/ledger/container/Ledger";
import Reports from "./pages/reports/container/Reports";
import RouteConstants from "./common/RouteConstants";
import Topbar from "./components/shared/Topbar";

export default function App() {
  return (
    <div className="md:flex">
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
