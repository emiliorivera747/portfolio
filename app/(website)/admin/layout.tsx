import SideNavigationBar from "@/components/navigation/SideNavigationBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emilio Rivera's Portfolio | DashBoard",
  description: "Admin dashboard for Emilio Rivera's ",
};

/**
 * Admin layout wrapper that provides the sidebar navigation
 * and main content area for all /admin routes.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Outer container: full viewport width, prevents vertical overflow
    <div className="max-h-screen pl-[2%] sm:pl-[2%]  border-box w-screen">
      {/* Inner flex container: stacks vertically on mobile, horizontal on sm+ */}
      <div className="flex sm:flex-row flex-col 2xl:mx-[15%] overflow-y-auto no-scrollbar">
        <SideNavigationBar />
        {/* Main content area that renders the active admin page */}
        <main className=" sm:w-full flex flex-col">{children}</main>
      </div>
    </div>
  );
}
