import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";

const App = () => {
  const location = useLocation();

  return (
    <>
      {!(location.pathname === "/signup" || location.pathname === "/login") && (
        <Navbar />
      )}
      <Outlet />
      {!(location.pathname === "/signup" || location.pathname === "/login") && (
        <Footer />
      )}
    </>
  );
};

export default App;
