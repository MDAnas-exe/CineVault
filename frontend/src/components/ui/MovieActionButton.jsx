const MovieActionButton = ({ icon, title }) => {
  return (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 cursor-pointer text-primary/60 hover:text-accent transition-colors"
      title={title}
    >
      {icon}
    </button>
  );
};

export default MovieActionButton;
