import { Calendar, Home, Inbox, Settings, AlignCenter } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/react.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Reindeer",
    url: "/reindeer",
    icon: Inbox,
  },
  {
    title: "Elves",
    url: "/elves",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export const SideBar = () => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <>
      {/* Mobile sidebar trigger */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground p-2 rounded-md"
        aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
      >
        {isCollapsed ? <AlignCenter size={24} /> : <AlignCenter size={24} />}
      </button>

      <Sidebar collapsible="icon">
        <SidebarContent className="bg-gradient-to-b from-red-100 to-green-100">
          <div className="flex justify-between">
            <img
              src={logo}
              alt="Logo"
              className="group-data-[collapsible=icon]:hidden ml-2"
            />
            <div className="relative h-14 px-4 flex items-center justify-end">
              <SidebarTrigger
                className={`absolute transition-all duration-300 ease-in-out
                ${isCollapsed ? "left-1/2 -translate-x-1/4" : "right-4"}
                hidden md:flex`}
              />
            </div>
          </div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
};
