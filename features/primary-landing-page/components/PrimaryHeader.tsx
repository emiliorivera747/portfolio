import Role from "@/features/primary-landing-page/components/Role";
import FullName from "@/features/primary-landing-page/components/FullName";

/**
 * The PrimaryHeader component displays the primary header section
 * with the full name and role of the individual.
 *
 * @returns Primary header component for the primary landing page.
 */
const PrimaryHeader = () => {
  return (
    <header className="flex flex-col gap-8">
      <FullName firstName={"Emilio"} lastName={"Rivera"} />
      <Role role={"Software Consultant"} />
    </header>
  );
};

export default PrimaryHeader;
