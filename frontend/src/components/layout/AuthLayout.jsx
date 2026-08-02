import { Outlet } from "react-router-dom";
import "../../App.css";
import GuestRoute from "../routes/GuestRoute";

const AuthLayout = () => {
  return (
    <GuestRoute>
      <Outlet />
    </GuestRoute>
  );
};

export default AuthLayout;
