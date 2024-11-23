import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchChristmasSongs } from "@/services/chillzone/chillzone";
import { NowPlaying } from "@/components/chillzone/nowPlaying";
import { Playlist } from "@/components/chillzone/playlist";
import { VolumeControl } from "@/components/chillzone/volumeControl";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import { GoogleGame } from "@/components/chillzone/googleGame";
import { LoadingScreen, ErrorScreen } from "@/components/global/santaDataLoader";
import roberto from "@/assets/fotoRV.png";

export const ChillZone = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(10);
  const audioRef = useRef(new Audio());
  const [currentSongIndex, setCurrentSongIndex] = useState(3);

  const {
    data: christmasSongs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["christmasSongs"],
    queryFn: fetchChristmasSongs,
  });

  const players = [
    {
      id: 1,
      name: "Roberto",
      image: roberto,
      role: "Frontend Developer",
      message:
        "I wish you all a Merry Christmas and a Happy New Year! Hoping this page brings you joy and festive cheer.",
      github: "https://github.com/RVSolutionsplus507",
      linkedin: "https://www.linkedin.com/in/roberto-j-vargas-d-69631159/",
    },
    {
      id: 2,
      name: "Maxi",
      image: "/placeholder.svg?height=40&width=40",
      role: "Frontend Developer",
      message:
        "Creative Designer focused on user experience and visual design. Wishing you a wonderful Christmas filled with love and happiness.",
      github: "https://github.com/maxi",
      linkedin: "https://linkedin.com/in/maxi",
    },
    {
      id: 3,
      name: "Pedro",
      image: "/placeholder.svg?height=40&width=40",
      role: "Backend Developer",
      message:
        "Backend Developer specializing in server-side logic and database management. Merry Christmas and a prosperous New Year!",
      github: "https://github.com/pedro",
      linkedin: "https://linkedin.com/in/pedro",
    },
    {
      id: 4,
      name: "Emmanuel",
      image: "/placeholder.svg?height=40&width=40",
      role: "Frontend Developer",
      message:
        "Project Manager with expertise in agile methodologies and team coordination. Wishing you a joyous Christmas season.",
      github: "https://github.com/emmanuel",
      linkedin: "https://linkedin.com/in/emmanuel",
    },
    {
      id: 5,
      name: "Luis",
      image: "/placeholder.svg?height=40&width=40",
      role: "Backend Developer",
      message:
        "QA Engineer ensuring the quality and reliability of software products. Have a Merry Christmas and a Happy New Year!",
      github: "https://github.com/luis",
      linkedin: "https://linkedin.com/in/luis",
    },
    {
      id: 6,
      name: "Rayberg",
      image: "/placeholder.svg?height=40&width=40",
      role: "Backend Developer",
      message:
        "DevOps Engineer with a focus on automation and infrastructure management. Wishing you a festive Christmas and a successful New Year!",
      github: "https://github.com/rayberg",
      linkedin: "https://linkedin.com/in/rayberg",
    },
  ];

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    audioRef.current.volume = newVolume[0] / 100;
  };

  const handleSongSelect = (song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handleSkipForward = () => {
    if (christmasSongs && christmasSongs.length > 0) {
      const nextIndex = (currentSongIndex + 1) % christmasSongs.length;
      handleSongSelect(christmasSongs[nextIndex], nextIndex);
    }
  };

  const handleSkipBack = () => {
    if (christmasSongs && christmasSongs.length > 0) {
      const prevIndex =
        (currentSongIndex - 1 + christmasSongs.length) % christmasSongs.length;
      handleSongSelect(christmasSongs[prevIndex], prevIndex);
    }
  };

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.previewUrl;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((error) => console.error("Playback failed:", error));
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    if (christmasSongs && christmasSongs.length > 0) {
      const initialSong = christmasSongs[currentSongIndex];
      setCurrentSong(initialSong);
      setIsPlaying(true);
      audioRef.current.src = initialSong.previewUrl;
      audioRef.current.volume = volume / 100;
      audioRef.current
        .play()
        .catch((error) => console.error("Initial playback failed:", error));
    }
  }, [christmasSongs, currentSongIndex]);

   if (isLoading) return <LoadingScreen />;
   if (error) return <ErrorScreen />;

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <h1 className="text-4xl text-center font-bold text-red-600 mb-8">
        <UnderlineTitle text="Christmas Chill Zone" />
      </h1>
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NowPlaying
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onSkipForward={handleSkipForward}
            onSkipBack={handleSkipBack}
          />
          <div className="mt-6">
            <VolumeControl
              volume={volume}
              onVolumeChange={handleVolumeChange}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <Playlist
            songs={christmasSongs}
            onSongSelect={(song, index) => handleSongSelect(song, index)}
            currentSongIndex={currentSongIndex}
          />
        </div>
      </div>
      <div className="mt-8">
        <GoogleGame players={players} />
      </div>
    </div>
  );
};
