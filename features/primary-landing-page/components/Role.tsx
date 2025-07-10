import { RoleProp } from "@/features/primary-landing-page/types/props";

/**
 * The Role component displays the role of the individual in a stylized format.
 *
 * @returns Role component for the primary landing page.
 */
const Role = ({ role }: RoleProp) => {
  return (
    <h1
      style={{ paddingBottom: "0.4rem", zIndex: 60 }}
      className="font-bold from-primary-700 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent sm:text-2xl text-2xl sm:mx-1 2xl:text-[2rem] pl-1 sm:pl-0 pb-[10rem] "
    >
      {role}
    </h1>
  );
};

export default Role;
