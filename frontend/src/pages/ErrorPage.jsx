import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    document.title = "Something Went Wrong | CineVault";
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className="text-4xl font-bold mb-2">Oops!</h1>
      <h3 className="text-lg text-gray-400 mb-4">Something went wrong.</h3>
      <p className="text-sm text-gray-500">
        {error?.message || error?.statusText || "Unknown error"}
      </p>
    </div>
  );
}

export default ErrorPage;
