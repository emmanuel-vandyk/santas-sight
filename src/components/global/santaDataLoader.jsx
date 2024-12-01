import SantaChristmasSpinner from "@/components/global/spinner";
import { ErrorPage } from "@/pages/errorPage";

export function LoadingScreen() {
  return (
    <div className="grid place-items-center h-full">
      <SantaChristmasSpinner />
    </div>
  );
}

export function ErrorScreen() {
  return (
    <div className="grid place-items-center h-full">
      <ErrorPage />
    </div>
  );
}
