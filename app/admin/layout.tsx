import SideNavigationBar from "@/components/navigation/SideNavigationBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emilio Rivera's Portfolio | DashBoard",
  description: "Admin dashboard for Emilio Rivera's ",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-screen pl-[2%] sm:pl-[2%]  border-box w-screen">
      <div className="flex sm:flex-row flex-col 2xl:mx-[15%] overflow-y-auto no-scrollbar">
        <SideNavigationBar />
        <main className=" sm:w-full flex flex-col">{children}</main>
      </div>
    </div>
  );
}
