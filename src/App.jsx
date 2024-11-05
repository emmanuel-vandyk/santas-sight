import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SideBar } from "@/components/global/sideBar.jsx";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset>
        <main>
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;