import Navbar from "../shared/Navbar/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../../App.css";
import { Suspense } from "react";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};
export default RootLayout;
