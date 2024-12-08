import { useState } from 'react'
import { LetterItem } from './LetterItem'
import { LetterModal } from './LetterModal'
import { StatCard } from "@/components/dashboard/statCard"
import { Gift } from 'lucide-react'
import propTypes from 'prop-types'

export const LetterList = ({ letters, onToggleReadStatus }) => {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalLetters = letters.length
  const readLetters = letters.filter(letter => letter.isRead).length
  const unreadLetters = totalLetters - readLetters

  const onOpenLetter = (letter) => {
    setSelectedLetter(letter)
    setIsModalOpen(true)
  }

  const onCloseLetter = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <StatCard
        icon={<Gift className="h-4 w-4" />}
        title="Letters"
        value={totalLetters}
        subtitle={`${readLetters} read, ${unreadLetters} unread`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {letters.map((letter) => (
          <div key={letter.id}>
            <LetterItem
              letter={letter}
              onOpen={() => onOpenLetter(letter)}
              onToggleRead={() => onToggleReadStatus(letter)}
            />
          </div>
        ))}
      </div>
      <LetterModal
        isOpen={isModalOpen}
        onClose={onCloseLetter}
        letter={selectedLetter}
      />
    </div>
  )
}

LetterList.propTypes = {
  letters: propTypes.arrayOf(propTypes.object).isRequired,
  onToggleReadStatus: propTypes.func.isRequired,
}

