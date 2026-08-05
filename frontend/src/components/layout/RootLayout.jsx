import Navbar from "../shared/Navbar/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../../App.css";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default RootLayout;
