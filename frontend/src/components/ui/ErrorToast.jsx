import { useState, useEffect } from "react";

const ErrorToast = ({ message }) => {
  const [prevMessage, setPrevMessage] = useState(message);
  const [visible, setVisible] = useState(Boolean(message));

  if (message !== prevMessage) {
    setPrevMessage(message);
    setVisible(Boolean(message));
  }

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`fixed top-0 left-1/2 -translate-x-1/2 transition-all duration-300
      ${visible ? "translate-y-4" : "-translate-y-full"}`}
    >
      <div className="bg-red-500 text-white px-4 py-2 rounded shadow-lg text-sm font-medium">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorToast;
