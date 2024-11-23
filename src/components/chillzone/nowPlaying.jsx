import propTypes from "prop-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

export const NowPlaying = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onSkipForward,
  onSkipBack,
}) => {
  return (
    <Card className="bg-gradient-to-b from-red-50 to-green-50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-green-700 font-bold">Now Playing</CardTitle>
        <CardDescription className="text-zinc-600 font-bold italic">
          Enjoy your favorite Christmas tunes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {currentSong ? (
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 md:w-48 md:h-48 mb-4">
              <AvatarImage src={currentSong.albumArt} alt={currentSong.title} />
              <AvatarFallback>{currentSong.title[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-lg md:text-xl text-green-700 font-bold text-center">
              {currentSong.title}
            </h2>
            <p className="text-lg md:text-xl text-red-700 text-center">
              {currentSong.artist}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-700">Select a song to start listening</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button
          className="bg-transparent shadow-md shadow-zinc-500 text-red-700 hover:bg-red-200"
          size="icon"
          onClick={onSkipBack}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button
          className="bg-transparent shadow-md shadow-zinc-500 text-red-700 hover:bg-red-200"
          size="icon"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          className="bg-transparent shadow-md shadow-zinc-500 text-red-700 hover:bg-red-200"
          size="icon"
          onClick={onSkipForward}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

NowPlaying.propTypes = {
  currentSong: propTypes.object,
  isPlaying: propTypes.bool,
  onPlayPause: propTypes.func,
  onSkipForward: propTypes.func,
  onSkipBack: propTypes.func,
};
