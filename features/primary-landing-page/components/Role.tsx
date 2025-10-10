import { RoleProp } from "@/features/primary-landing-page/types/props";

/**
 * The Role component displays the role of the individual in a stylized format.
 *
 * @returns Role component for the primary landing page.
 */
const Role = ({ role }: RoleProp) => {
  return (
    <div className="role-heading">
      <h1
        className="bg-gradient-to-r from-primary-500 to-primary-1000 bg-clip-text text-transparent"
      >
        {role}
      </h1>
    </div>
  );
};

export default Role;
