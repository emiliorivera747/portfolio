import Link from "next/link";
/**
 *
 * My portfolio page
 *
 * @returns portfolio page
 */
const page = () => {
  return (
    <section className="bg-white text-black h-screen w-screen font-bold text-5xl ">
      <div className="px-8 flex flex-col items-center justify-center h-full w-full">
        <span className="mb-6 text-[2rem] sm:text-md">Coming soon...</span>
        <span className="text-primary-700 text-[1rem] sm:px-0 px-4 sm:text-[1.1rem] mb-8 font-light">
          For the meantime you can check out the source code.
        </span>

        <Link
          className="font-light text-sm text-zinc-500 hover:text-zinc-800 underline underline-offset-4 mb-2"
          href="/"
        >
          ← Back to home
        </Link>
        <Link
          className="font-light  box-border w-[18rem] source-code-button flex item-center justify-center text-center gap-4 text-primary-800 hover:font-semibold transition-all duration-1000 ease-in-out bg-white border rounded-[12px] border-primary-500 px-8 py-4 text-2xl"
          href="https://github.com/emiliorivera747/portfolio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="currentColor"
            style={{ color: "#333" }}
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="flex items-center ">Source Code</span>
        </Link>
      </div>
    </section>
  );
};

export default page;
