import { useState, useEffect } from "react"
import propTypes from "prop-types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import reindeerimage from "@/assets/reindeer1.webp"
import { SnowDecoration } from "@/components/global/snowDecoration"

export function ReindeerModalInfo({ reindeer, isOpen, onClose }) {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  if (!reindeer) return null

return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-green-100 to-red-100">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-red-600">{reindeer.name}</DialogTitle>
                <DialogDescription>Reindeer Stats</DialogDescription>
            </DialogHeader>
            <Card className="rounded-xl bg-gradient-to-r from-blue-500 to-black">
                <div className="relative h-48 flex justify-center">
                    <img
                        src={reindeerimage}
                        alt={reindeer.name}
                        className="p-4 w-auto h-48 object-contain rounded-lg"
                    />
                    <SnowDecoration className="absolute top-0 left-0 w-full h-full" />
                </div>
            </Card>
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    {reindeer.skills.map((skill) => (
                        <div key={skill.skill} className="flex flex-col space-y-1.5">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">{skill.skill}</span>
                                <span className="text-sm font-medium">{skill.value}/10</span>
                            </div>
                            <Progress value={skill.value * 10} className="h-2 bg-green-500 " />
                        </div>
                    ))}
                </div>
            </div>
        </DialogContent>
    </Dialog>
)
}

ReindeerModalInfo.propTypes = {
  reindeer: propTypes.object,
  isOpen: propTypes.bool,
  onClose: propTypes.func,
}