import { twMerge } from "tailwind-merge";

const UserInfoHeader = ({ name, email, className = "" }) => {
  return (
    <div
      className={twMerge(
        "border-b border-gray-200 p-4 text-left dark:border-slate-700",
        className,
      )}
    >
      <h3 className="font-poppins text-lg font-semibold text-primary dark:text-slate-100">
        {name}
      </h3>

      <p className="mt-1 font-inter text-sm text-secondary dark:text-slate-400">{email}</p>
    </div>
  );
};
export default UserInfoHeader;
