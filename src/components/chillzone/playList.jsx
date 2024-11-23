import propTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Playlist = ({ songs, onSongSelect, currentSongIndex }) => {
return (
    <Card className="bg-gradient-to-b from-red-50 to-green-50 backdrop-blur-lg h-full">
        <CardHeader>
            <CardTitle className="text-green-700 text-center font-bold">Christmas playlist 2024</CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[300px] md:h-[450px] w-full rounded-lg shadow-zinc-500 p-4 shadow-md">
                {songs.map((song, index) => (
                    <Button
                        key={song.id}
                        className={`w-full h-12 my-1 justify-start rounded-lg ${
                            index === currentSongIndex
                                ? 'bg-green-200 text-green-700 hover:bg-green-200'
                                : 'bg-transparent hover:bg-green-50'
                        }`}
                        onClick={() => onSongSelect(song, index)}
                    >
                        <Avatar className="w-8 h-8 md:w-10 md:h-10 mr-2">
                            <AvatarImage src={song.albumArt} alt={song.title} />
                            <AvatarFallback>{song.title[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-left overflow-hidden">
                            <div className="font-semibold text-zinc-600 truncate">{song.title}</div>
                            <div className="text-sm text-green-700 truncate">{song.artist}</div>
                        </div>
                    </Button>
                ))}
            </ScrollArea>
        </CardContent>
    </Card>
);
};

Playlist.propTypes = {
  songs: propTypes.array,
  onSongSelect: propTypes.func,
  currentSongIndex: propTypes.number,
};
