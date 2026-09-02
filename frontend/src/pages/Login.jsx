import AuthCard from "../features/auth/components/AuthCard";
import Logo from "../components/ui/Logo";
import authBg from "../assets/images/AuthPageLeftSideBGImg.avif";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Login | CineVault";
  }, []);

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <section
        className=" hidden min-h-screen overflow-hidden bg-cover bg-center lg:block"
        style={{ backgroundImage: `url(${authBg})` }}
      >
        <div className="relative flex min-h-screen flex-col justify-between p-12 xl:p-16">
          <div className="[&_.text-primary]:text-white">
            <Logo />
          </div>

          <div className="max-w-xl pb-6 text-white">
            <h1 className="font-poppins text-4xl font-semibold leading-tight xl:text-5xl">
              Track every movie.
              <br />
              Remember <span className="text-accent">every story.</span>
            </h1>
            <p className="mt-5 max-w-md font-inter text-lg leading-relaxed text-white/75 xl:text-xl">
              Create your personal movie diary with ratings, reviews, and
              watchlists.
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-6 sm:px-8 lg:px-12">
        <AuthCard type="login" />
      </section>
    </main>
  );
};
export default Login;
