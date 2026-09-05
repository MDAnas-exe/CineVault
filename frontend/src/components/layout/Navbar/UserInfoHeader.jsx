import { twMerge } from "tailwind-merge";

const UserInfoHeader = ({ name, email, className = "" }) => {
  return (
    <div
      className={twMerge(
        "border-b border-border p-4 text-left",
        className,
      )}
    >
      <h3 className="font-poppins text-lg font-semibold text-primary">
        {name}
      </h3>

      <p className="mt-1 font-inter text-sm text-secondary">{email}</p>
    </div>
  );
};
export default UserInfoHeader;
