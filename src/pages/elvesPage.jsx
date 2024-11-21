import ElvesTable from "@/components/elves/ElvesTable";
import { UnderlineTitle } from "@/components/global/underlineTitle";

export const ElvesPage = () => {
  return (
    <section className="relative">
      <h1 className="text-4xl text-center font-bold text-red-600 mb-8">
      <UnderlineTitle text="Elve Management" />
      </h1>
      <ElvesTable />
    </section>
  );
};