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

      navigate("/login", { replace: true });
    },
    onError: () => toast.error("Couldn't log out. Please try again."),
  });

  return (
    <Button
      type="button"
      className={twMerge(
        "flex w-full items-center gap-2 rounded-b-2xl rounded-t-none bg-white px-4 py-3 text-left font-inter font-normal text-red-600 hover:bg-red-50 active:scale-100 focus:ring-0 focus:ring-offset-0 dark:bg-slate-900 dark:hover:bg-red-950/40",
        className,
      )}
      onClick={() =>
        mutateAsync({
          endpoint: "auth/logout",
          signal: AbortSignal.timeout(8000),
        })
      }
    >
      <IoExitOutline />
      Logout
    </Button>
  );
};
export default LogoutButton;
