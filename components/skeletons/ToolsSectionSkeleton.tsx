const CARD_COUNT = 6;

const ToolsSectionSkeleton = () => {
  return (
    <div className="min-h-[70vh] h-auto w-screen animate-pulse">
      {/* Header */}
      <div className="p-10 flex justify-center pt-20">
        <div className="h-8 w-36 bg-primary-200 rounded" />
      </div>

      {/* Filter buttons */}
      <div className="h-20 flex flex-row items-center justify-center gap-2 w-full mb-[2rem]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[3.3rem] w-40 bg-primary-200 rounded-[12px]" />
        ))}
      </div>

      {/* Tool cards */}
      <div className="w-screen flex overflow-hidden px-[0.4rem] sm:px-60 pb-10 items-center justify-center gap-3 sm:gap-10 flex-wrap pt-2">
        {[...Array(CARD_COUNT)].map((_, i) => (
          <div
            key={i}
            className="grid grid-rows-[3fr_3rem] h-[10rem] w-[10rem] sm:h-[12rem] sm:w-[12rem] bg-primary-100 rounded-[12px] border border-primary-200 items-center justify-center"
          >
            <div className="flex items-center justify-center h-full w-full">
              <div className="h-[6rem] w-[6rem] bg-primary-200 rounded-[12px]" />
            </div>
            <div className="flex items-start justify-center pt-2">
              <div className="h-3 w-16 bg-primary-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsSectionSkeleton;
