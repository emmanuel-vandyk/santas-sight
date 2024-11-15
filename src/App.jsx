import { Outlet } from "react-router-dom";
import  SideBar  from "@/components/global/sideBar";
import { Separator } from "@/components/ui/separator";
import SnowFlakeTop from "@/components/global/snowFlakeTop";

export default function Component() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1 relative">
        <Separator className="relative z-20" />
        <div className="absolute top-0 left-0 w-full h-20 z-10 overflow-hidden">
          <div className="w-[120%] -ml-[10%]">
            <SnowFlakeTop />
          </div>
        </div>
        <main className="flex-1 overflow-auto p-4 relative z-20 pt-16"> 
          <Outlet />
        </main>
      </div>
    </div>
  );
}