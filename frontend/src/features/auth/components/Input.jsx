const Input = ({ label, placeholder, icon: Icon, reg }) => {
  return (
    <div>
      <label className="mb-1 block font-medium text-primary">{label}</label>

      <div className="flex h-12 items-center rounded-xl border border-gray-300 bg-white px-4 transition-colors duration-200 hover:border-gray-400 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
        <Icon className="mr-3 text-gray-500" />

        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent text-primary placeholder:text-gray-400 focus:outline-none"
          {...reg}
        />
      </div>
    </div>
  );
};

export default Input;
