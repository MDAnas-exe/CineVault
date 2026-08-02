function Loader({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A017] [animation-delay:-0.3s]" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A017] [animation-delay:-0.15s]" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A017]" />
    </div>
  );
}

export default Loader;
