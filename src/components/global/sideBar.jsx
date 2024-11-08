import { AlignCenter } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChristmasTree, Reindeer, ChristmasElf, ChristmasSnowflake, ChristmasLogout } from "@/components/global/iconsChristmas"
import { SnowDecoration } from "@/components/global/snowDecoration"
import logo from "@/assets/sslogo.webp"

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
      <div className={`relative flex flex-col h-screen ${isCollapsed ? "w-20" : "w-64"} transition-all duration-300`}>
        <div className="absolute inset-0 bg-gradient-to-b from-red-100 via-green-100 to-red-100 pointer-events-none">
          <SnowDecoration />
        </div>
        <div className="relative z-10 flex flex-col items-center pt-2 flex-grow">
          <div className="flex justify-around items-center w-full mb-6 px-4">
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-300 ease-in-out ${isCollapsed ? "hidden" : "w-64 h-30 mt-2"}`}
            />
            <button
              onClick={toggleSidebar}
              className={`transition-all duration-300 ease-in-out text-green-600 hover:text-red-700 ${isCollapsed ? "absolute top-6 mr-2" : "absolute top-3 right-6"}`}
            >
              <AlignCenter className="h-6 w-6" />
            </button>
          </div>
          <div className="w-full flex-grow">
            <div className={`space-y-2 px-2 ${isCollapsed ? "py-6" : ""}`}>
              {items.map((item) => (
                <div key={item.title} className="group">
                  <Link
                    to={item.url}
                    className="flex items-center px-4 py-3 w-full hover:bg-red-500 text-zinc-800 hover:text-white font-bold transition-colors duration-200 rounded-lg overflow-hidden"
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span className={`ml-3 ${isCollapsed ? "hidden" : ""}`}>{item.title}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 p-4 bg-red-300 rounded-t-full shadow-xl mt-auto">
          <div className={`flex flex-col items-center gap-4 mb-4 transition-all duration-300 ease-in-out ${isCollapsed ? "mb-0" : ""}`}>
            <Avatar className={`border-4 border-red-200 ${isCollapsed ? "w-10 h-10" : "w-16 h-16"}`}>
              <AvatarImage src="https://www.svgrepo.com/show/222575/santa-claus-christmas.svg" alt="Santa Claus" />
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
            <ChristmasLogout className={`h-5 w-10 ${isCollapsed ? "h-6 w-6" : ""}`} />
            <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>Log out</span>
          </Button>
        </div>
      </div>
    </>
  )
}