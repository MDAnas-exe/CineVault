import { IoExitOutline } from "react-icons/io5";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../../utils/apiRequest";
import { toast } from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const LogoutButton = ({ className = "" }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: apiRequest,
    onSuccess: (data) => {
      toast.success("Logout Successful");
      queryClient.setQueryData(["auth", "me"], null);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    },
    onError: () => toast.error("Couldn't log out. Please try again."),
  });

  return (
    <Button
      type="button"
      className={twMerge(
        "rounded-b-2xl px-4 py-3 text-left font-inter text-red-600 transition-colors  hover:bg-red-50 flex gap-2 items-center bg-white rounded-t-none font-normal focus:outline-none focus:ring-0 active:scale-none focus:ring-offset-0",
        className,
      )}
      onClick={() => mutateAsync({ endpoint: "auth/logout" })}
    >
      <IoExitOutline />
      Logout
    </Button>
  );
};
export default LogoutButton;
