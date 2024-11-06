import { AlignCenter } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChristmasTree, Reindeer, ChristmasElf, ChristmasSnowflake, ChristmasLogout } from "@/components/global/iconsChristmas"
import { SnowDecoration } from "@/components/global/snowDecoration"
import logo from "@/assets/react.svg"

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
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200"
        aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
      >
        <AlignCenter className="h-6 w-6" />
      </button>

      <div className={`relative flex flex-col h-screen ${isCollapsed ? "w-20" : "w-64"} transition-all duration-300`}>
        <div className="absolute inset-0 bg-gradient-to-b from-red-100 via-green-100 to-red-100 pointer-events-none">
          <SnowDecoration />
        </div>
        <div className="relative z-10 flex flex-col items-center pt-6 flex-grow">
          <div className="flex justify-between items-center w-full mb-6 px-4">
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-300 ease-in-out ${isCollapsed ? "w-2 h-2 opacity-0" : "w-12 h-12"}`}
            />
            <button
              onClick={toggleSidebar}
              className={`transition-all duration-300 ease-in-out text-red-600 hover:text-red-700 ${isCollapsed ? "absolute top-6 ml-2" : ""}`}
            >
              <AlignCenter className="h-6 w-6" />
            </button>
          </div>
          <div className="w-full flex-grow">
            <div className="space-y-2 px-2">
              {items.map((item) => (
                <div key={item.title} className="group">
                  <Link
                    to={item.url}
                    className="flex items-center px-4 py-3 w-full hover:bg-red-500 text-zinc-800 hover:text-white font-bold transition-colors duration-200 rounded-lg overflow-hidden"
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span className={`ml-3 ${isCollapsed ? "hidden" : ""}`}>{item.title}</span>
                    {/* <div className="absolute inset-y-0 left-0 w-1 bg-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top"></div> */}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 p-4 bg-red-300 rounded-t-3xl shadow-xl mt-auto">
          <div className={`flex flex-col items-center gap-4 mb-4 transition-all duration-300 ease-in-out ${isCollapsed ? "mb-0" : ""}`}>
            <Avatar className={`border-4 border-red-200 ${isCollapsed ? "w-10 h-10" : "w-16 h-16"}`}>
              <AvatarImage src="https://github.com/shadcn.png" alt="Santa Claus" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className={`text-center ${isCollapsed ? "hidden" : ""}`}>
              <p className="font-bold text-zinc-800 text-lg">Santa Claus</p>
              <p className="text-sm text-zinc-800">santa@northpole.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className={`w-full ${isCollapsed ? "p-2 aspect-square" : ""} text-slate-950 hover:bg-red-500 hover:text-white transition-all duration-200 font-bold flex items-center justify-center`}
          >
            <ChristmasLogout className={`h-5 w-5 ${isCollapsed ? "h-6 w-6" : ""}`} />
            <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>Log out</span>
          </Button>
        </div>
      </div>
    </>
  )
}