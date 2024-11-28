import { LetterItem } from './letterItem'
import propTypes from 'prop-types'

export const LetterList = ({ letters, onOpenLetter, onToggleReadStatus }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {letters.map((letter) => (
        <div key={letter.id} >
          <LetterItem
            letter={letter}
            onOpen={onOpenLetter}
            onToggleRead={onToggleReadStatus}
          />
        </div>
      ))}
    </div>
  )
}

LetterList.propTypes = {
  letters: propTypes.array.isRequired,
  onOpenLetter: propTypes.func.isRequired,
  onToggleReadStatus: propTypes.func.isRequired,
}

