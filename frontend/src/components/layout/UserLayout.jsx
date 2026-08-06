import Navbar from "../shared/Navbar/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../routes/ProtectedRoute";
const UserLayout = () => {
  return (
    <ProtectedRoute>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </ProtectedRoute>
  );
};
export default UserLayout;
