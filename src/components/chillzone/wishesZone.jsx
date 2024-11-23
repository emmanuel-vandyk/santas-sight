import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import horns from "@/assets/horns.png";
import dev from "@/assets/background_dev.jpeg";
import propTypes from "prop-types";

export const Wishes = ({ players }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleStartWishes = () => {
    if (selectedPlayer) {
      setGameStarted(true);
    }
  };

  return (
    <div
      className="flex justify-center items-center w-full rounded-3xl bg-cover bg-center"
      style={{ backgroundImage: `url(${dev})` }}
    >
      <Card className="w-full max-w-4xl bg-transparent backdrop-blur-md md:my-10">
        <CardContent className="p-4 md:p-8">
          <div className="text-xl md:text-2xl font-bold mb-8 text-center">
            <h2 className="text-red-600">We wish you a merry christmas 🎄</h2>
          </div>
          {!gameStarted ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {players.map((player) => (
                  <Button
                    key={player.id}
                    onClick={() => {
                      setSelectedPlayer(player);
                      handleStartWishes();
                    }}
                    className={`
                      ${
                        selectedPlayer?.id === player.id
                          ? "bg-green-700 hover:bg-green-600"
                          : "bg-transparent shadow-black hover:bg-green-700 shadow-sm"
                      }
                      flex flex-col items-center justify-center p-2 h-auto
                    `}
                  >
                    <Avatar className="w-12 h-12 mb-2">
                      <AvatarImage src={player.image} alt={player.name} />
                      <AvatarFallback>{player.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-center">{player.name}</span>
                  </Button>
                ))}
              </div>
              
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 z-10">
                  <img
                    src={selectedPlayer.image}
                    alt={`${selectedPlayer.name}'s photo`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -top-8 left-24 transform -translate-x-1/2 w-20 z-20">
                  <img src={horns} alt="horns" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">
                  {selectedPlayer.name} - {selectedPlayer.role}
                </p>
                <div className="flex justify-center space-x-4 my-4">
                  <a
                    href={selectedPlayer.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png"
                      alt="GitHub"
                      className="hover:scale-110"
                    />
                  </a>
                  <a
                    href={selectedPlayer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/ios-glyphs/30/ffffff/linkedin.png"
                      alt="LinkedIn"
                      className="hover:scale-110"
                    />
                  </a>
                </div>
                <p className="mt-2 text-sm text-red-100 italic font-bold">
                  {selectedPlayer.message}
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => setGameStarted(false)}
                  className="bg-green-700 hover:bg-green-600 text-white"
                >
                  Go back
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

Wishes.propTypes = {
  players: propTypes.array,
};
