import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { HistoryIcon, MapPinIcon, TrashIcon, RefreshCw } from 'lucide-react'
import PropTypes from 'prop-types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AddressHistory({ locations, onRestore, onDelete }) {
  const [locationToDelete, setLocationToDelete] = useState(null)

  const handleDelete = () => {
    if (locationToDelete) {
      onDelete(locationToDelete)
      setLocationToDelete(null)
    }
  }

  return (
    <Card className="h-100vh md:h-full bg-gradient-to-r from-red-50 to-green-50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center text-green-800">
          <HistoryIcon className="mr-2" />
          Santa&apos;s Previous Stops
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-100vh md:h-[calc(90vh-16rem)]">
          {locations.map((location, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 p-2 rounded-md bg-slate-800 bg-opacity-10 backdrop-filter backdrop-blur-xl">
              <div className="flex items-center flex-grow mr-2 min-w-0 mb-2 sm:mb-0">
                <MapPinIcon className="mr-2 flex-shrink-0 text-red-700" />
                <span className="text-sm break-words">
                  {location.name.split(',').map((part, i, arr) => (
                    <span key={i}>
                      {part.trim()}
                      {i === arr.length - 3 && <br />}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex items-start md:items-center flex-shrink-0 ">
                <Button
                  size="icon"
                  onClick={() => onRestore(location)}
                  className="mr-2 bg-transparent hover:bg-green-100"
                >
                  <RefreshCw className="h-4 w-4 text-green-700  " />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      onClick={() => setLocationToDelete(location)}
                      className="bg-transparent hover:bg-red-100"
                    >
                      <TrashIcon className="h-4 w-4 text-red-700" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure you want to delete this route?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        this route and remove it from Santa&apos;s workshop
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-red-500">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

AddressHistory.propTypes = {
  locations: PropTypes.array.isRequired,
  onRestore: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

