import React from "react";

const page = ({ params }: { params: { id: String } }) => {
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center text-xl font-bold">
      <h1>Page is in the works!</h1>
      <span className="text-primary-700 font-light">post id: {params.id}</span>
    </section>
  );
};

export default page;
