import ElvesTable from "@/components/elves/ElvesTable";

export const ElvesPage = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
        Elve Management
      </h1>
      <ElvesTable />
    </section>
  );
};
