import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/global/sideBar";
import { Separator } from "@/components/ui/separator";

export default function App() {


  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <nav className="w-full h-[68px] bg-white text-zinc-800">
          <div className="mx-auto px-4 h-full">
            <div className="flex justify-between items-center h-full">
              Here Goes the nav component
            </div>
          </div>
        </nav>
        <Separator />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}