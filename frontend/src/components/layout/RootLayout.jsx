import Navbar from "../shared/Navbar/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../../App.css";
import { Suspense } from "react";

const RootLayout = () => {
  return (
    <Suspense fallback={null}>
      <Navbar />
      <Outlet />
      <Footer />
    </Suspense>
  );
};
export default RootLayout;
