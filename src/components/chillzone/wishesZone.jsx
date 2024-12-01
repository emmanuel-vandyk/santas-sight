import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import dev from "@/assets/background_dev.jpeg"
import propTypes from "prop-types"
import { MemberModal } from "@/components/chillzone/memberModal"

export const Wishes = ({ members }) => {
  const [selectedMember, setSelectedMember] = useState(null)

  const handleOpenModal = (member) => {
    setSelectedMember(member)
  }

  const handleCloseModal = () => {
    setSelectedMember(null)
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
            {members.map((member) => (
              <Button
                key={member.id}
                onClick={() => handleOpenModal(member)}
                className="bg-transparent shadow-black hover:bg-green-700 shadow-sm flex flex-col items-center justify-center p-2 h-auto"
              >
                <Avatar className="w-12 h-12 mb-2">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-center">{member.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <MemberModal
        isOpen={!!selectedMember}
        onClose={handleCloseModal}
        member={selectedMember}
      />
    </div>
  )
}

Wishes.propTypes = {
  members: propTypes.array,
}

