import { twMerge } from "tailwind-merge";

const UserInfoHeader = ({ name, email, className = "" }) => {
  return (
    <div
      className={twMerge("border-b border-gray-200 text-left p-4", className)}
    >
      <h3 className="font-poppins text-lg font-semibold text-primary">
        {name}
      </h3>

      <p className="mt-1 font-inter text-sm text-secondary">{email}</p>
    </div>
  );
};
export default UserInfoHeader;
