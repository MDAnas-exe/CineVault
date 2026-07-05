const MovieActionButton = ({ icon, title }) => {
  return (
    <button
      className="size-7 lg:size-10 flex items-center justify-center rounded-full sm:border border-gray-200 cursor-pointer text-primary/60 hover:text-accent transition-colors"
      title={title}
    >
      {icon}
    </button>
  );
};

export default MovieActionButton;
