import Navbar from "../shared/Navbar/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
const UserLayout = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <Outlet />
      <Footer />
    </ProtectedRoute>
  );
};
export default UserLayout;
