import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import Logo from "../../../components/ui/Logo";
import Button from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

const AuthCard = ({ type }) => {
  const isSignup = type === "signup";

  return (
    <div className="w-full max-w-[450px] rounded-2xl border border-[#E5E7EB] bg-white px-5 py-7 shadow-[0_18px_50px_rgba(17,24,39,0.12)] sm:px-8 sm:py-8 lg:py-9">
      <div className="mb-6 flex flex-col items-center text-center sm:mb-7">
        <Logo />
        <h1 className="mt-6 font-poppins text-2xl font-bold text-primary sm:mt-7 sm:text-3xl">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 font-inter text-sm text-[#6B7280] sm:text-base">
          {isSignup
            ? "Start building your movie collection."
            : "Sign in to continue your movie journey."}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
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

      <Button type="submit" className="mt-6 sm:mt-7">
        {isSignup ? "Create Account" : "Sign In"}
      </Button>

      <p className="mt-6 text-center font-inter text-sm text-primary sm:text-base">
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
