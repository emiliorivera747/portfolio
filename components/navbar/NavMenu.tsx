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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                      className={`uppercase bg-transparent font-bold hover:text-white hover:bg-transparent focus:bg-transparent active:bg-transparent tracking-widest rounded-lg p-[0.8rem] ${menuTextColor} text-sm tracking-wider focus:text-white data-[state=open]:bg-transparent data-[state=open]:text-white ${active ? "underline underline-offset-4" : ""}`}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    {(() => {
                      const isGrid = item.content?.some(
                        (s) => s.logo || s.initials || s.stack
                      );
                      return (
                        <NavigationMenuContent
                          className={`backdrop-blur-sm bg-primary-300/30 text-white text-sm rounded-lg border-none outline-none ${
                            isGrid
                              ? "grid grid-cols-2 gap-3 p-6 min-w-[22rem]"
                              : "flex flex-col gap-3 py-4 px-6 pb-6 min-w-[14rem]"
                          }`}
                        >
                          {item.content?.map((subItem: SubMenuItem) => {
                            const derivedInitials = subItem.initials ??
                              subItem.label.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

                            const hasLogo = !!(subItem.logo || subItem.initials || subItem.stack);

                            const logo = (
                              <span className="flex items-center justify-center">
                                {subItem.stack ? (
                                  <span className="flex items-center">
                                    {subItem.stack.map((stackItem, i) => (
                                      <Avatar
                                        key={i}
                                        className={`w-12 h-12 border-2 border-white ${stackItem.logo ? "bg-transparent" : "bg-primary-800"}`}
                                        style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: subItem.stack!.length - i }}
                                      >
                                        {stackItem.logo && <AvatarImage src={stackItem.logo} alt={stackItem.initials} className="object-contain p-1" />}
                                        <AvatarFallback className="bg-primary-800 text-primary-100 text-[0.65rem] font-bold">
                                          {stackItem.initials}
                                        </AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </span>
                                ) : (
                                  <Avatar className={`w-12 h-12 ${subItem.logo ? "bg-transparent border-none" : "border border-primary-600 bg-primary-800"}`}>
                                    {subItem.logo && <AvatarImage src={subItem.logo} alt={subItem.label} className="object-contain p-1" />}
                                    <AvatarFallback className="bg-primary-800 text-primary-100 text-xs font-bold">
                                      {derivedInitials}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </span>
                            );

                            const linkClass = isGrid
                              ? `flex flex-col items-center justify-start gap-2 text-center text-[0.8rem] ${linkTextColor} font-medium rounded-lg p-3 hover:bg-transparent transition-colors duration-200 min-h-[5.5rem]`
                              : `flex items-center gap-3 text-[1rem] ${linkTextColor} font-medium rounded-lg py-1 px-1`;

                            return (
                              <NavigationMenuLink
                                key={subItem.id}
                                className="w-full"
                                asChild
                              >
                                {subItem.external || subItem.url.includes("#") ? (
                                  <a
                                    href={subItem.url}
                                    className={linkClass}
                                    aria-label={subItem.label}
                                    {...(subItem.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                  >
                                    {hasLogo && logo}
                                    <span className="hover:underline hover:underline-offset-4 hover:decoration-2 leading-tight">{subItem.label}</span>
                                  </a>
                                ) : (
                                  <Link
                                    href={subItem.url}
                                    className={linkClass}
                                    aria-label={subItem.label}
                                  >
                                    {hasLogo && logo}
                                    <span className="hover:underline hover:underline-offset-4 hover:decoration-2 leading-tight">{subItem.label}</span>
                                  </Link>
                                )}
                              </NavigationMenuLink>
                            );
                          })}
                        </NavigationMenuContent>
                      );
                    })()}
                  </>
                )}

                {/* Without content*/}
                {!item.content && (
                  <NavigationMenuLink
                    asChild
                    className={`uppercase bg-transparent font-bold hover:text-white hover:bg-transparent focus:bg-transparent active:bg-transparent tracking-widest rounded-lg p-[0.8rem] ${menuTextColor} text-sm tracking-wider ${active ? "underline underline-offset-4" : ""}`}
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
