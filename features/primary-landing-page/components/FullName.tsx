import { FullNameProp } from "@/features/primary-landing-page/types/props";

/**
 *
 * Displays the full name of the individual in a stylized format.
 *
 * @param firstName - The first name.
 * @param lastName - The last name.
 * @returns FullName component for the primary landing page.
 */
const FullName = ({ firstName, lastName }: FullNameProp) => {
  return (
    <header className="flex lg:flex-row flex-row gap-1 sm:text-5xl md:gap-3 sm:mb-6 text-4xl  md:text-6xl 2xl:text-[5rem]  mb-2 bg-white-300">
      <h1 className="text-white font-semibold">
        <span>{firstName}</span> <span>{lastName}</span>
      </h1>
    </header>
  );
};

export default FullName;
