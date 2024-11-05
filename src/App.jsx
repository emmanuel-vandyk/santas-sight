import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { SideBar } from "@/components/global/sideBar.jsx";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <SidebarProvider>
        <SideBar variant="inset" />
        <SidebarInset>
          <main>
            <div className="flex justify-start">
              <SidebarTrigger />
            </div>
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
