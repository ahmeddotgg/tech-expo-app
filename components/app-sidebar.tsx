"use client";

import { Home, User2, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex-row items-center">
        <span className="rounded-md bg-gradient-to-bl from-blue-700 to-indigo-700 p-1.5">
          <Zap className="size-6! fill-white stroke-white" />
        </span>
        <span className="font-semibold text-lg">Tech Expo.</span>
      </SidebarHeader>
      <SidebarContent className="px-1 py-6">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/"}
              onClick={() => setOpenMobile(false)}
            >
              <Link href="/">
                <Home />
                <span>Home</span>
                <span
                  className={cn(
                    "ms-auto hidden h-4 w-1 rounded-sm bg-sidebar-accent-foreground/70",
                    pathname === "/" &&
                      "fade-in zoom-in block animate-in bg-primary duration-300",
                  )}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/users"}
              onClick={() => setOpenMobile(false)}
            >
              <Link href="/users">
                <User2 />
                <span>Users</span>
                <span
                  className={cn(
                    "ms-auto hidden h-4 w-1 rounded-sm bg-sidebar-accent-foreground",
                    pathname === "/users" &&
                      "fade-in zoom-in block animate-in bg-primary duration-300",
                  )}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
