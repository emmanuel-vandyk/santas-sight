import { useState } from 'react';
import propTypes from 'prop-types';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const VolumeControl = ({ volume, onVolumeChange }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handleMuteToggle = () => {
    if (isMuted) {
      onVolumeChange([previousVolume]);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      onVolumeChange([0]);
      setIsMuted(true);
    }
  };

  return (
    <div className="flex justify-start md:w-1/3">
     <Card className="bg-gradient-to-b from-red-50 to-green-50 backdrop-blur-lg w-full">
      <CardContent className="flex items-center justify-between p-4 text-green-700">
        <div className="flex items-center">
          <Button
            size="icon"
            onClick={handleMuteToggle}
            className="mr-2 hover:scale-110 transition-transform hover:bg-green-50 bg-transparent text-green-700"
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
          </Button>
          <span className="mr-2 hidden sm:inline">Volume</span>
        </div>
        <Slider
          className="w-full sm:w-48 md:w-64 bg-white"
          value={[isMuted ? 0 : volume]}
          onValueChange={(newValue) => {
            onVolumeChange(newValue);
            if (newValue[0] > 0) {
              setIsMuted(false);
            }
          }}
          max={100}
          step={1}
        />
      </CardContent>
    </Card>
    </div>
  );
};

VolumeControl.propTypes = {
  volume: propTypes.number,
  onVolumeChange: propTypes.func,
};

