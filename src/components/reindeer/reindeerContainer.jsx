import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from '@/components/reindeer/sortableItem'
import { ReindeerCard } from '@/components/reindeer/reindeerCard'

export function ReindeerContainer({ title, titleColor, reindeer }) {
  return (
    <div className="bg-white border-4 border-red-500 rounded-xl p-6 shadow-lg">
      <h2 className={`${titleColor} mb-4 text-2xl font-bold`}>{title}</h2>
      <div className="bg-green-100 rounded-lg p-4 border-2 border-green-300">
        <SortableContext items={reindeer.map(p => p.id)} strategy={verticalListSortingStrategy}>
          {reindeer.map((person) => (
            <SortableItem key={person.id} id={person.id}>
              <ReindeerCard reindeer={person} />
            </SortableItem>
          ))}
        </SortableContext>
      </div>
    </div>
  )
}