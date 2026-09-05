import { AuthContext } from "../context/auth/AuthContext";
import { useContext } from "react";
export default function useAuth() {
  return useContext(AuthContext);
}
