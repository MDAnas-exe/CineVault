import { useRef, useEffect } from "react";
import EmailVerificationCard from "../features/auth/components/EmailVerificationCard";
import { useMutation } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import pendingImg from "../assets/images/EmailVerificationPending.avif";
import successImg from "../assets/images/EmailVerificationSuccess.avif";
import failureImg from "../assets/images/EmailVerificationFailure.avif";

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: apiRequest,
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: () => {
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
    },
  });

  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!token || hasTriggered.current) return;

    const timer = setTimeout(() => {
      hasTriggered.current = true;
      mutateAsync({ endpoint: `auth/verify-email?token=${token}` });
    }, 2000);

    return () => clearTimeout(timer);
  }, [token, mutateAsync]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="relative w-full max-w-120 h-110 sm:h-120">
        <EmailVerificationCard
          imgSrc={pendingImg}
          heading="Verifying your email..."
          subHeading="Please wait while we securely verify your CineVault account."
          loaderMessage="Verifying your account..."
          footerMessage="This usually takes only a few seconds."
          className={isPending ? "opacity-100" : ""}
        />

        <EmailVerificationCard
          imgSrc={successImg}
          heading="Email verified"
          subHeading="Your CineVault account has been verified successfully."
          loaderMessage="Redirecting..."
          footerMessage="You'll be redirected shortly."
          className={isSuccess ? "opacity-100" : ""}
        />

        <EmailVerificationCard
          imgSrc={failureImg}
          heading="Verification failed"
          subHeading={
            isError &&
            (error.status >= 500
              ? "Something went wrong. Please try again later"
              : "The verification link is invalid, expired, or has already been used.")
          }
          loaderMessage="Redirecting..."
          footerMessage="Taking you back to the sign in page."
          className={isError ? "opacity-100" : ""}
        />
      </div>
    </main>
  );
}

export default EmailVerification;
