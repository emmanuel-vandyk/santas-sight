import { AlignCenter, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import {
  ChristmasTree,
  Reindeer,
  ChristmasElf,
  ChristmasSnowflake,
  ChristmasLogout,
  Letters,
  Route,
} from "@/components/global/iconsChristmas";
import { SnowDecoration } from "@/components/global/snowDecoration";
import useMediaQuery from "@/hooks/useMediaQuery";
import logo from "@/assets/sslogo2.webp";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChristmasTree,
  },
  {
    title: "Santa's Routes",
    url: "/santaroutes",
    icon: Route,
  },
  {
    title: "Reindeer Setup",
    url: "/reindeer",
    icon: Reindeer,
  },
  {
    title: "Santa's Calories Counter",
    url: "/calories",
    icon: Cookie,
  },
  {
    title: "Elve Management",
    url: "/elves",
    icon: ChristmasElf,
  },
  {
    title: "Letters",
    url: "/navcards",
    icon: Letters,
  },
  {
    title: "Chill Zone",
    url: "/chillzone",
    icon: ChristmasSnowflake,
  },
];

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 730px)");
  const location = useLocation();

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const SidebarContent = () => (
    <>
      <div className="relative z-10 flex flex-col items-center pt-2 flex-grow">
        <div className="flex justify-around items-center w-full mb-6 px-4">
          <img
            src={logo}
            alt="Santa's Workshop Logo"
            className={`transition-all duration-300 ease-in-out ${
              isCollapsed && !isMobile ? "hidden" : "w-64 h-30 mt-2"
            }`}
          />
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className={`transition-all duration-300 ease-in-out text-white hover:scale-110 hover:text-green-600 font-bold rounded-full ${
                isCollapsed ? "absolute top-6 mr-2" : "absolute top-3 right-6"
              }`}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <AlignCenter className="h-8 w-8" />
            </button>
          )}
        </div>
        <nav className="w-full flex-grow">
          <ul className={`space-y-2 px-2 ${isCollapsed ? "py-6 mt-8" : ""}`}>
            {items.map((item) => (
              <li key={item.title} className="group">
                <Link
                  to={item.url}
                  className={`flex items-center px-4 py-3 w-full hover:bg-green-600 hover:scale-105 text-white font-bold transition-all duration-300 rounded-lg overflow-hidden ${
                    location.pathname === item.url
                      ? "bg-green-700 text-white"
                      : ""
                  }`}
                >
                  <item.icon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className={`ml-3 ${isCollapsed ? "hidden" : ""}`}>
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="relative z-10 p-4 bg-green-700 rounded-t-full shadow-xl mt-auto">
        <div
          className={`flex flex-col items-center gap-4 mb-4 transition-all duration-300 ease-in-out ${
            isCollapsed ? "mb-0" : ""
          }`}
        >
          <Avatar
            className={`border-4 border-red-200 ${
              isCollapsed ? "w-10 h-10" : "w-16 h-16"
            }`}
          >
            <AvatarImage
              src="https://www.svgrepo.com/show/222575/santa-claus-christmas.svg"
              alt="Santa Claus"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {(!isCollapsed || isMobile) && (
            <div className={`text-center ${isCollapsed ? "hidden" : ""}`}>
              <p className="font-bold text-white text-lg">Santa Claus</p>
              <p className="text-sm text-white">santa@northpole.com</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className={`w-full ${
            isCollapsed ? "p-2 aspect-square" : ""
          } text-white hover:bg-red-700 hover:text-white transition-all duration-300 font-bold flex items-center justify-center`}
        >
          <ChristmasLogout
            className={`h-5 w-10 font-bold ${isCollapsed ? "h-6 w-6" : ""}`}
          />
          <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>Log out</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-red-600 text-white p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <AlignCenter className="h-6 w-6" />
          )}
        </button>
      )}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <div
        className={`
          ${isMobile ? "fixed" : "relative"} 
          top-0 left-0 bottom-0 
          bg-gradient-to-b from-red-900 via-red-600 to-black 
          ${isCollapsed && !isMobile ? "w-20" : "w-64"} 
          transition-all duration-300 ease-in-out
          ${
            isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : ""
          }
          z-50
        `}
      >
        <div
          className={`flex flex-col h-full ${
            isMobile ? "items-center justify-center" : ""
          }`}
        >
          <SidebarContent />
        </div>
      </div>
      {!isMobile && (
        <SnowDecoration className="absolute inset-0 pointer-events-none" />
      )}
    </>
  );
}
