import { RoleProp } from "@/features/primary-landing-page/types/props";

/**
 * The Role component displays the role of the individual in a stylized format.
 *
 * @returns Role component for the primary landing page.
 */
const Role = ({ role }: RoleProp) => {
  return (
    <div className="role-heading ">
      <h1>{role}</h1>
    </div>
  );
};

export default Role;
