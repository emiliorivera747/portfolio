import { useState } from "react";

/**
 *
 * Custom hook handle file state change and state
 *
 * @returns file handler and file
 */
const useFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0])
      setFile(event.target.files[0]);
  };
  return { handleFileChange, file };
};

export default useFile;
