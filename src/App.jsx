import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SideBar } from "@/components/global/sideBar";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <SideBar />
        <SidebarInset className="flex-1 overflow-auto">
          <main className="p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default App;
