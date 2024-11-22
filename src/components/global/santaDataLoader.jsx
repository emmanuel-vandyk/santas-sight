import SantaChristmasSpinner from "@/components/global/spinner";

export function LoadingScreen() {
  return (
    <div className="grid place-items-center h-full">
      <SantaChristmasSpinner />
    </div>
  );
}

export function ErrorScreen() {
  return <div>Error fetching</div>;
}
