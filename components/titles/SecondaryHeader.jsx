import React from "react";

const SecondaryHeader = ({ title }) => {
  return (
    <h1 className={`font-bold text-3xl text-zinc-700 pt-6 pb-2`}>{title}</h1>
  );
};

export default SecondaryHeader;
