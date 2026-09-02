import { Outlet } from "react-router-dom";
import GuestRoute from "../routes/GuestRoute";
import { Suspense } from "react";
import "../../App.css";

const AuthLayout = () => {
  return (
    <GuestRoute>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </GuestRoute>
  );
};

export default AuthLayout;
