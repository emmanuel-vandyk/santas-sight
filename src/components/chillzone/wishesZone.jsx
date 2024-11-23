import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import dev from "@/assets/background_dev.jpeg"
import propTypes from "prop-types"
import { PlayerModal } from "./PlayerModal"

export const Wishes = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const handleOpenModal = (player) => {
    setSelectedPlayer(player)
  }

  const handleCloseModal = () => {
    setSelectedPlayer(null)
  }

  const words = `Team 3 wishes everyone a Merry Christmas! 🎄`

  return (
    <div
      className="flex justify-center items-center w-full rounded-3xl bg-cover bg-center"
      style={{ backgroundImage: `url(${dev})` }}
    >
      <Card className="w-full max-w-4xl bg-transparent backdrop-blur-md md:my-10">
        <CardContent className="p-4 md:p-8">
          <div className="text-xl md:text-2xl font-bold mb-8 text-center">
            <TextGenerateEffect words={words} duration={2} filter={true} repeat={true} interval={5} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {players.map((player) => (
              <Button
                key={player.id}
                onClick={() => handleOpenModal(player)}
                className="bg-transparent shadow-black hover:bg-green-700 shadow-sm flex flex-col items-center justify-center p-2 h-auto"
              >
                <Avatar className="w-12 h-12 mb-2">
                  <AvatarImage src={player.image} alt={player.name} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-center">{player.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <PlayerModal
        isOpen={!!selectedPlayer}
        onClose={handleCloseModal}
        player={selectedPlayer}
      />
    </div>
  )
}

Wishes.propTypes = {
  players: propTypes.array,
}

