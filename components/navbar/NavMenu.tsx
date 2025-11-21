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

const NavMenu = ({ menuItems, menuTextColor }: NavMenuItems) => {
  return (
    <div className="hidden items-center justify-end space-x-10  md:flex pr-10 z-30">
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          {menuItems.map((item: MenuItem) => {
            return (
              <NavigationMenuItem key={item.id} className="relative">
                {/* With content */}
                {item.content && (
                  <>
                    <NavigationMenuTrigger
                      className={`uppercase bg-transparent text-white font-bold hover:text-white hover:backdrop-blur-md hover:bg-transparent focus:bg-transparent tracking-widest rounded-lg p-[0.8rem] ${menuTextColor} font-bold text-sm tracking-wider focus:text-white data-[state=open]:hover:bg-transparent data-[state=open]:text-primary-400`}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                      className="py-4 px-6 pb-6 backdrop-blur bg-primary-300/20 flex flex-col gap-2 rounded-lg border-none outline-none"
                    >
                      {item.content?.map((subItem: SubMenuItem) => {
                        return (
                          <NavigationMenuLink
                            key={subItem.id}
                            className="w-[10rem]"
                            asChild
                          >
                            <Link
                              key={subItem.id}
                              href={subItem.url}
                              className={`block text-[1rem] text-primary-800 font-medium rounded-lg p-[0.2rem] hover:underline hover:underline-offset-4 hover:decoration-2`}
                              aria-label={subItem.label}
                            >
                              {subItem.label}
                            </Link>
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
                    className={`uppercase bg-transparent font-bold  hover:backdrop-blur-md hover:bg-transparent focus:bg-transparent tracking-widest rounded-lg p-[0.8rem] ${menuTextColor} font-bold text-sm tracking-wider focus:text-white data-[state=open]:hover:bg-transparent data-[state=open]:text-primary-400 hover:text-primary-400`}
                    >
                    <Link
            
                      href={item.url}
                    >
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
