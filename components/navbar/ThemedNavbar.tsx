"use client";
import { useTheme } from "next-themes";
import Navbar from "@/components/navbar/Navbar";
import { MenuItem } from "@/types/navbar";

interface ThemedNavbarProps {
  menuItems: MenuItem[];
}

export default function ThemedNavbar({ menuItems }: ThemedNavbarProps) {
  const { resolvedTheme } = useTheme();
  return <Navbar menuItems={menuItems} mode={resolvedTheme === "dark" ? "light" : "dark"} />;
}
