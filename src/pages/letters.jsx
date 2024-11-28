import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchLetters, updateLetterStatus } from '@/services/navcards/navcards'
import { LetterList } from '@/components/letters/letterList'
import { LetterModal } from '@/components/letters/letterModal'
import { UnderlineTitle } from '@/components/global/underlineTitle'

export const Letters = () => {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  // const { data: letters = [], isLoading, isError } = useQuery({
  //   queryKey: ['letters'],
  //   queryFn: fetchLetters,
  // })

  // const updateLetterMutation = useMutation({
  //   mutationFn: updateLetterStatus,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['letters'])
  //   },
  // })

  // const openLetter = async (letter) => {
  //   setSelectedLetter(letter)
  //   setIsModalOpen(true)
  //   if (!letter.read) {
  //     await updateLetterMutation.mutateAsync({ id: letter.id, read: true })
  //   }
  // }

  // const toggleReadStatus = async (letter) => {
  //   await updateLetterMutation.mutateAsync({ id: letter.id, read: !letter.read })
  // }

  // if (isLoading) return <div>Cargando cartas...</div>
  // if (isError) return <div>Error al cargar las cartas</div>

  const { data: letters = [], isLoading, isError } = useQuery({
    queryKey: ['letters'],
    queryFn: fetchLetters,
  })

  const updateLetterMutation = useMutation({
    mutationFn: updateLetterStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['letters'])
    },
  })

  const openLetter = async (letter) => {
    setSelectedLetter(letter)
    setIsModalOpen(true)
    if (!letter.read) {
      await updateLetterMutation.mutateAsync({ id: letter.id, read: true })
    }
  }

  const toggleReadStatus = async (letter) => {
    await updateLetterMutation.mutateAsync({ id: letter.id, read: !letter.read })
  }

  if (isLoading) return <div>Cargando cartas...</div>
  if (isError) return <div>Error al cargar las cartas</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold text-red-600 mb-8">
      <UnderlineTitle text="Santa's Letters" />
      </h1>
      <LetterList 
        letters={letters}
        onOpenLetter={openLetter}
        onToggleReadStatus={toggleReadStatus}
      />
      <LetterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        letter={selectedLetter}
      />
    </div>
  )
}

