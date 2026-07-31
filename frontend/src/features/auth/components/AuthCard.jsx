import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import Logo from "../../../components/ui/Logo";
import Button from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

const AuthCard = ({ type }) => {
  const isSignup = type === "signup";

  return (
    <div
      className={`flex h-full w-full max-w-112.5 flex-col justify-center  rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.12)] sm:px-8 sm:py-8 lg:py-5 ${isSignup ? "gap-2" : "gap-6"}`}
    >
      <div className="flex flex-col items-center gap-2 text-center sm:gap-1.5">
        <Logo />
        <h1 className="font-poppins text-2xl font-bold text-primary sm:text-3xl">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="font-inter text-sm text-[#6B7280] sm:text-base">
          {isSignup
            ? "Start building your movie collection."
            : "Sign in to continue your movie journey."}
        </p>
      </div>

      <div className="space-y-1 sm:space-y-2">
        {isSignup && (
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            icon={FaUser}
          />
        )}
        <Input
          label="Email Address"
          placeholder="Enter your email address"
          icon={FaEnvelope}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          icon={FaLock}
        />
      </div>

      <Button type="submit">{isSignup ? "Create Account" : "Sign In"}</Button>

      <p className="text-center font-inter text-sm text-primary sm:text-base">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          to={isSignup ? "/login" : "/signup"}
          className="font-semibold text-accent transition-colors duration-200 hover:text-[#b9870d]"
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
};
export default AuthCard;
