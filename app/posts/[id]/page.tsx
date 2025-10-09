import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center text-xl font-bold">
      <h1>Page is in the works!</h1>
      <span className="text-primary-700 font-light">post id: {id}</span>
    </section>
  );
};

export default Page;
