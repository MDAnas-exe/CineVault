import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) navigate("/login", { replace: true });
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading || !isLoggedIn) return null;

  return children;
};
export default ProtectedRoute;
