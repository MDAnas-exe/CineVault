import Navbar from "../shared/Navbar/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Suspense } from "react";
const UserLayout = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={null}>
        <Navbar />
        <Outlet />
        <Footer />
      </Suspense>
    </ProtectedRoute>
  );
};
export default UserLayout;
