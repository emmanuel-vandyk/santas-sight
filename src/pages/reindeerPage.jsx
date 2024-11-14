import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { SunIcon } from "lucide-react"
import { ReindeerCard } from '@/components/reindeer/reindeerCard'
import { ReindeerContainer } from '@/components/reindeer/reindeerContainer'

const initialReindeer = [
  { id: '1', name: 'Rudolph', description: 'The red-nosed reindeer', type: 'master' },
  { id: '2', name: 'Dasher', description: 'Known for great speed', type: 'trainee' },
  { id: '3', name: 'Dancer', description: 'Graceful and nimble', type: 'trainee' },
  { id: '4', name: 'Prancer', description: 'Proud and energetic', type: 'trainee' },
  { id: '5', name: 'Vixen', description: 'Beautiful and clever', type: 'junior' },
  { id: '6', name: 'Comet', description: 'Strong and fast', type: 'junior' },
  { id: '7', name: 'Cupid', description: 'Loving and gentle', type: 'junior' },
]

export const ReindeerPage = () => {
  const [activeId, setActiveId] = useState(null)
  const [people, setPeople] = useState(initialReindeer)
  const [aiPrompt, setAiPrompt] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setPeople((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  const generateAIAlignment = async () => {
    // Implement AI Here
    console.log('Generating alignment with AI...')
  }

  return (
    <div className="min-h-screen  text-green-900 p-4 sm:p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">Santas Reindeer Dashboard</h1>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <ReindeerContainer title="Lead Reindeer" titleColor="text-red-600" reindeer={people.filter(p => p.type === 'master')} />
              <ReindeerContainer title="Experienced Reindeer" titleColor="text-green-600" reindeer={people.filter(p => p.type === 'trainee')} />
              <ReindeerContainer title="Junior Reindeer" titleColor="text-blue-600" reindeer={people.filter(p => p.type === 'junior')} />
            </div>

            <div className="space-y-8">
              <Card className="bg-white border-4 border-red-500 p-4 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-green-700 mb-4">Santas AI Helper</h3>
                <Textarea
                  className="bg-green-50 border-2 border-green-300 mb-4 text-green-900 placeholder-green-500"
                  placeholder="Enter your Christmas wish for AI alignment..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={generateAIAlignment}
                >
                  Generate Christmas Magic
                </Button>
              </Card>

              <Card className="bg-white border-4 border-green-500 p-4 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-red-600 mb-4">North Pole Weather</h3>
                <div className="flex items-center justify-center p-4">
                  <div className="text-center">
                    <SunIcon className="w-16 h-16 mx-auto mb-2 text-yellow-400" />
                    <span className="text-lg font-semibold text-blue-600">Frosty Sunshine</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <DragOverlay>
            {activeId ? (
              <ReindeerCard reindeer={people.find(p => p.id === activeId)} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}