const Loading = () => {
  return (
    <div className="flex flex-row gap-2 min-h-screen justify-center items-center">
      <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
};

export default Loading;
