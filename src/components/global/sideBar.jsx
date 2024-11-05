import { AlignCenter } from "lucide-react";
import { Link } from "react-router-dom"
import logo from "@/assets/react.svg"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChristmasTree, Reindeer, ChristmasElf, ChristmasSnowflake, ChristmasLogout } from "@/components/global/iconsChristmas.jsx"
import { SnowDecoration } from "@/components/global/snowDecoration.jsx"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChristmasTree,
  },
  {
    title: "Reindeer",
    url: "/reindeer",
    icon: Reindeer,
  },
  {
    title: "Elves",
    url: "/elves",
    icon: ChristmasElf,
  },
  {
    title: "Settings",
    url: "#",
    icon: ChristmasSnowflake,
  },
]

export const SideBar = () => {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200"
        aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
      >
        <AlignCenter size={24} onClick={toggleSidebar} />
      </button>

      <Sidebar collapsible="icon" className="overflow-hidden w-64 group-data-[collapsible=icon]:w-20 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-red-100 via-green-100 to-red-100 pointer-events-none">
          <SnowDecoration />
        </div>
        <SidebarContent className="relative z-10 flex flex-col items-center pt-6">
          <div className="flex justify-between items-center w-full mb-6 px-4">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:w-2 group-data-[collapsible=icon]:h-2 group-data-[collapsible=icon]:opacity-0"
            />
            <SidebarTrigger className="transition-all duration-300 ease-in-out text-red-600 hover:text-red-700 group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:top-6" />
          </div>
          <SidebarGroup className="w-full">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2 px-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={isCollapsed ? item.title : undefined}
                      className="w-full hover:bg-red-500 hover:text-white font-bold transition-colors duration-200 rounded-lg overflow-hidden group"
                    >
                      <Link to={item.url} className="flex items-center px-4 py-3">
                        <item.icon className="h-6 w-6 flex-shrink-0" />
                        <span className="ml-3 group-data-[collapsible=icon]:hidden">{item.title}</span>
                        <div className="absolute inset-y-0 left-0 w-1 bg-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top"></div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="relative z-10 p-4 bg-green-600 rounded-t-3xl shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)] mt-auto">
          <div className="flex flex-col items-center gap-4 mb-4 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:mb-0">
            <Avatar className="w-16 h-16 border-4 border-red-500 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="Santa Claus" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="text-center group-data-[collapsible=icon]:hidden">
              <p className="font-bold text-white text-lg">Santa Claus</p>
              <p className="text-sm text-green-100">santa@northpole.com</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:aspect-square text-white hover:bg-green-700 hover:text-white transition-all duration-200 font-bold flex items-center justify-center"
          >
            <ChristmasLogout className="h-5 w-5 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" />
            <span className="group-data-[collapsible=icon]:hidden ml-2">Log out</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}