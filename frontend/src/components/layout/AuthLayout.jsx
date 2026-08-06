import { Outlet } from "react-router-dom";
import "../../App.css";
import GuestRoute from "../routes/GuestRoute";
import { Toaster } from "react-hot-toast";
const AuthLayout = () => {
  return (
    <GuestRoute>
      <Toaster />
      <Outlet />
    </GuestRoute>
  );
};

export default AuthLayout;
