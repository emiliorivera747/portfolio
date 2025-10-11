import React from "react";

const page = () => {
  return (
    <section className="h-screen w-screen text-md flex flex-col items-center justify-center text-red-500 font-semibold">
      <div className="flex flex-col gap-2 items-start justify-center bg-red-50 border border-red-400 rounded-[12px] py-20 px-10">
        <p>There was an authorization error. </p>
        <p>Please make sure you have the proper permissions.</p>
      </div>
    </section>
  );
};

export default page;
