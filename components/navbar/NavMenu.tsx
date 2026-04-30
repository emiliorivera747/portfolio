"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MenuItem, SubMenuItem, NavMenuItems } from "@/types/navbar";

// Next.js
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMenu = ({ menuItems, menuTextColor, contentBg = "light" }: NavMenuItems) => {
  const pathname = usePathname();
  const linkTextColor = contentBg === "dark" ? "text-primary-100" : "text-primary-1000";

  const isActive = (item: MenuItem) => {
    if (item.content) return item.content.some((sub) => pathname === sub.url);
    return pathname === item.url || pathname.startsWith(item.url + "/");
  };

  return (
    <div className="hidden items-center justify-end space-x-10  md:flex pr-10 z-30">
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          {menuItems.map((item: MenuItem) => {
            const active = isActive(item);
            return (
              <NavigationMenuItem key={item.id} className="relative">
                {/* With content */}
                {item.content && (
                  <>
                    <NavigationMenuTrigger
                      className={`uppercase bg-transparent text-white font-bold hover:text-white hover:backdrop-blur-md hover:bg-transparent focus:bg-transparent tracking-widest rounded-lg p-[0.8rem] ${menuTextColor} font-bold text-sm tracking-wider focus:text-white data-[state=open]:hover:bg-transparent data-[state=open]:text-primary-400 ${active ? "underline underline-offset-4" : ""}`}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                      className="py-4 px-6 pb-6 backdrop-blur-sm bg-primary-300/30  text-white text-sm flex flex-col gap-2 rounded-lg border-none outline-none"
                    >
                      {item.content?.map((subItem: SubMenuItem) => {
                        return (
                          <NavigationMenuLink
                            key={subItem.id}
                            className="w-[10rem]"
                            asChild
                          >
                            {subItem.url.includes("#") ? (
                              <a
                                href={subItem.url}
                                className={`block text-[1rem] ${linkTextColor} font-medium rounded-lg p-[0.2rem] hover:underline hover:underline-offset-4 hover:decoration-2`}
                                aria-label={subItem.label}
                              >
                                {subItem.label}
                              </a>
                            ) : (
                              <Link
                                key={subItem.id}
                                href={subItem.url}
                                className={`block text-[1rem] ${linkTextColor} font-medium rounded-lg p-[0.2rem] hover:underline hover:underline-offset-4 hover:decoration-2`}
                                aria-label={subItem.label}
                              >
                                {subItem.label}
                              </Link>
                            )}
                          </NavigationMenuLink>
                        );
                      })}
                    </NavigationMenuContent>
                  </>
                )}

                {/* Without content*/}
                {!item.content && (
                  <NavigationMenuLink
                    asChild
                    className={`uppercase bg-transparent font-bold hover:backdrop-blur-md hover:bg-transparent focus:bg-transparent tracking-widest rounded-lg p-[0.8rem] ${menuTextColor} font-bold text-sm tracking-wider focus:text-white data-[state=open]:hover:bg-transparent data-[state=open]:text-primary-400 hover:text-primary-400 ${active ? "underline underline-offset-4" : ""}`}
                  >
                    <Link href={item.url}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default React.memo(NavMenu);
