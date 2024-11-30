import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchChristmasSongs, fetchAllMembers } from "@/services/chillzone/chillzone";
import { NowPlaying } from "@/components/chillzone/nowPlaying";
import { Playlist } from "@/components/chillzone/playlist";
import { VolumeControl } from "@/components/chillzone/volumeControl";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import { Wishes } from "@/components/chillzone/wishesZone";
import {
  LoadingScreen,
  ErrorScreen,
} from "@/components/global/santaDataLoader";

export const ChillZone = () => {
  console.log("ChillZone component is rendering");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(10);
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(3);

  const {
    data: christmasSongs,
    isLoading: isSongsLoading,
    error: songsError,
  } = useQuery({
    queryKey: ["christmasSongs"],
    queryFn: fetchChristmasSongs,
  });

  const {
    data: members,
    isLoading: isMembersLoading,
    error: membersError
  } = useQuery({
    queryKey: ["members"],
    queryFn: fetchAllMembers,
  });

  useEffect(() => {
    console.log("Initial useEffect is running");
    audioRef.current = new Audio();
    audioRef.current.volume = volume / 100;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [volume]);

  useEffect(() => {
    console.log("useEffect for currentSong is running", { currentSong, isPlaying });
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.previewUrl;
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (christmasSongs && christmasSongs.length > 0) {
      const initialSong = christmasSongs[currentSongIndex];
      setCurrentSong(initialSong);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.src = initialSong.previewUrl;
      }
    }
  }, [christmasSongs, currentSongIndex]);

  if (isSongsLoading || isMembersLoading) return <LoadingScreen />;
  if (songsError || membersError) return <ErrorScreen />;
  if (!christmasSongs || !christmasSongs.length || !members || !Array.isArray(members)) {
    return <ErrorScreen />;
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
    }
  };

  const handleSongSelect = (song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
    if (audioRef.current) {
      audioRef.current.src = song.previewUrl;
    }
    setIsPlaying(false);
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
        <Wishes members={members} />
      </div>
    </div>
  );
};

