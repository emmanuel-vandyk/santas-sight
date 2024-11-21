import ElvesTable from "@/components/elves/ElvesTable";
import { RoughNotation } from "react-rough-notation";

export const ElvesPage = () => {
  return (
    <section className="relative">
      <h1 className="text-4xl text-center font-bold text-red-600 mb-8">
        <div className="relative inline-block">
          <span className="relative z-10">Elve Management</span>
          <RoughNotation
            type="underline"
            show={true}
            strokeWidth={3}
            iterations={2}
            animationDuration={5000}
            color="green"
            multiline={true}
            className="absolute left-0 right-0 bottom-0"
          >
            <span className="invisible">Elve Management</span>
          </RoughNotation>
        </div>
      </h1>
      <ElvesTable />
    </section>
  );
};