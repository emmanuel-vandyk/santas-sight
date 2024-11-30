import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MailOpenIcon, Mail } from 'lucide-react'
import propTypes from 'prop-types'

export const LetterItem = ({ letter, onOpen, onToggleRead }) => {
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 ${
        letter.isRead 
          ? 'bg-white shadow-md' 
          : 'bg-gradient-to-r from-green-50 to-red-50 shadow-lg transform hover:-translate-y-1'
      }`}
    >
      <CardContent className="p-6">
        <div 
          className={`absolute top-0 right-0 w-0 h-0 transition-all duration-300 ${
            letter.isRead
              ? 'border-t-[30px] border-r-[30px] border-t-zinc-200 border-r-zinc-200'
              : 'border-t-[30px] border-r-[30px] border-t-green-700 border-r-green-700'
          }`}
        />
        <div className={`relative z-10 ${letter.isRead ? 'opacity-70' : ''}`}>
          <h2 className="font-semibold mb-2 text-zinc-700">Letter from {letter.children.name}</h2>
          <p className="text-sm text-gray-500 mb-4">
            Date: {new Date(letter.create_at).toLocaleDateString()}
          </p>
          <div className="flex justify-between items-center">
            <Button 
              className={`flex items-center ${
                letter.isRead 
                  ? 'bg-green-100 text-zinc-700 hover:bg-green-600 hover:text-white' 
                  : 'bg-green-700 text-white hover:bg-green-600'
              }`} 
              onClick={() => onOpen(letter)}
            >
              {letter.isRead ? <MailOpenIcon className="mr-2" /> : <Mail className="mr-2" />}
              {letter.isRead ? 'Read Again' : 'Open Letter'}
            </Button>
            <Button 
              variant="outline" 
              className={`border-red-700 text-red-700 hover:bg-red-600 hover:text-white ${
                letter.isRead ? 'opacity-50' : ''
              }`}
              onClick={() => onToggleRead(letter)}
            >
              {letter.isRead ? 'Mark as Unread' : 'Mark as Read'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

LetterItem.propTypes = {
  letter: propTypes.object.isRequired,
  onOpen: propTypes.func.isRequired,
  onToggleRead: propTypes.func.isRequired,
}

