import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Ledger from "./pages/Ledger";
import Reports from "./pages/Reports";
import RouteConstants from "./common/RouteConstants";
import Topbar from "./components/Topbar";

export default function App() {
  return (
    <div className="md:flex">
      <Router>
        <Navbar />
        <div className="md:flex md:flex-col w-full">
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
