import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HistoryIcon, MapPinIcon, TrashIcon, RefreshCw } from 'lucide-react';
import PropTypes from 'prop-types'

export default function AddressHistory({ locations, onRestore, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-green-800">
        <HistoryIcon className="mr-2" />
        Santa&apos;s Previous Stops
      </h2>
      <ScrollArea className="h-64">
        {locations.map((location, index) => (
          <div key={index} className="flex items-center justify-between mb-2 p-2 bg-red-50 rounded">
            <div className="flex items-center flex-grow mr-2">
              <MapPinIcon className="mr-2 text-red-500" />
              <span className="text-sm truncate">
                {location.name.length > 20 ? (
                  <>
                    {location.name.slice(0, 20)}<br />{location.name.slice(20)}
                  </>
                ) : (
                  location.name
                )}
              </span>
            </div>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRestore(location)}
                className="mr-2 p-2"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(location)}
                className="p-2"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

AddressHistory.propTypes = {
  locations: PropTypes.array.isRequired,
  onRestore: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

