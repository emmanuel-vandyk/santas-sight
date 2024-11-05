import { Card } from "@/components/ui/card";

export function ReindeerCard({ reindeer }) {
  return (
    <Card className="bg-red-500 border-2 border-green-500 p-4 mb-2 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
      <h3 className="font-bold text-white text-lg">{reindeer.name}</h3>
      <p className="text-sm text-green-100">{reindeer.description}</p>
      <div className="mt-2 flex justify-center">
        <span className="text-white text-2xl">🦌</span>
      </div>
    </Card>
  )
}