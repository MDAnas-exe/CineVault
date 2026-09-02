import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import Logo from "../../../components/ui/Logo";
import Button from "../../../components/ui/Button.jsx";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import apiRequest from "../../../utils/apiRequest.js";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Reel from "../../../assets/images/reel.svg?react";

const AuthCard = ({ type }) => {
  const queryClient = useQueryClient();
  const isSignup = type === "signup";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: apiRequest,
    onSuccess: (data) => {
      toast.success(data.message);
      if (!isSignup)
        queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      setTimeout(() => {
        if (!isSignup) navigate("/");
      }, 2000);
    },
    onError: (err) => {
      toast.error(err.message, {
        className: "left-1/4 relative",
      });
    },
  });

  async function onSubmit(data) {
    mutateAsync({ data, endpoint: `auth/${isSignup ? "signup" : "login"}` });
  }

  return (
    <>
      <form
        className={`flex h-full w-full max-w-112.5 flex-col justify-center  rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.12)] sm:px-8 sm:py-8  ${isSignup ? "gap-2 lg:py-3" : "gap-6 lg:py-5"}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center sm:gap-1.5">
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="font-poppins text-2xl font-bold text-primary sm:text-3xl">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="font-inter text-sm text-[#6B7280] sm:text-base">
            {isSignup
              ? "Start building your movie collection."
              : "Sign in to continue your movie journey."}
          </p>
        </div>

        <div>
          {isSignup && (
            <>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                icon={FaUser}
                register={{
                  ...register("name", {
                    required: "name cannot be empty",
                    maxLength: {
                      value: 50,
                      message: "Maximum length is 50 characters",
                    },
                    setValueAs: (v) => v.trim(),
                  }),
                }}
              />
              <p className="min-h-5 text-sm text-red-500">
                {errors.name?.message}
              </p>
            </>
          )}

          <Input
            label="Email Address"
            placeholder="Enter your email address"
            icon={FaEnvelope}
            type="email"
            register={{
              ...register("email", {
                required: "Email required",
                setValueAs: (v) => v.trim(),
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "invalid email format",
                },
              }),
            }}
          />

          <p className="min-h-5 text-sm text-red-500">
            {errors.email?.message}
          </p>

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            icon={FaLock}
            register={
              isSignup
                ? {
                    ...register("password", {
                      required: "password required",
                      maxLength: {
                        value: 128,
                        message:
                          "Maximum length for password is 128 characters",
                      },
                      minLength: {
                        value: 8,
                        message: "minimum length for password is 8 characters",
                      },
                      setValueAs: (v) => v.trim(),
                      validate: (v) => {
                        if (!/[a-z]/.test(v))
                          return "Lowercase letter required";
                        if (!/[A-Z]/.test(v))
                          return "Uppercase letter required";
                        if (!/\d/.test(v)) return "Number required";
                        if (!/[!@#$%^&*(),.?":{}|<>]/.test(v))
                          return "Special character required";
                        return true;
                      },
                    }),
                  }
                : {
                    ...register("password", {
                      required: "password required",
                      setValueAs: (v) => v.trim(),
                    }),
                  }
            }
          />

          <p className="min-h-5 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="flex h-12 w-full items-center justify-center gap-2 bg-accent text-primary shadow-sm hover:bg-accent-hover disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Reel className=" size-7 animate-spin" fill="currentColor" />
              {isSignup ? "Signing Up...." : "Logging In...."}
            </>
          ) : isSignup ? (
            "Create Account"
          ) : (
            "Sign In"
          )}
        </Button>

        <p className="text-center font-inter text-sm text-primary sm:text-base">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            to={isSignup ? "/login" : "/signup"}
            className="font-semibold text-accent transition-colors duration-200 hover:text-[#000000]"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </form>
    </>
  );
};
export default AuthCard;
