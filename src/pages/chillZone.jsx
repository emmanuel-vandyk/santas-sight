import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchChristmasSongs, fetchAllMembers } from "@/services/chillzone/chillzone";
import { NowPlaying } from "@/components/chillzone/nowPlaying";
import { Playlist } from "@/components/chillzone/playList";
import { VolumeControl } from "@/components/chillzone/volumeControl";
import { UnderlineTitle } from "@/components/global/underlineTitle";
import { Wishes } from "@/components/chillzone/wishesZone";
import {
  LoadingScreen,
  ErrorScreen,
} from "@/components/global/santaDataLoader";

export const ChillZone = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(10);
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(3);

  const {
    data: christmasSongs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["christmasSongs"],
    queryFn: fetchChristmasSongs,
  });

  const {
    data,
  } = useQuery({
    queryKey: ["members"],
    queryFn: fetchAllMembers,
  });

  useEffect(() => {
    if (christmasSongs && christmasSongs.length > 0) {
      const song = christmasSongs[currentSongIndex];
      setCurrentSong(song);
      if (audioRef.current && song.previewUrl) {
        audioRef.current.src = song.previewUrl;
        audioRef.current.load();
      }
    }
  }, [christmasSongs, currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Autoplay failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = useCallback(() => {
    if (audioRef.current && audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      console.error("No audio source available");
    }
  }, [isPlaying]);

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
    }
  };

  const handleSongSelect = useCallback((song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
    setIsPlaying(false);
    if (audioRef.current && song.previewUrl) {
      audioRef.current.src = song.previewUrl;
      audioRef.current.load();
    }
  }, []);

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  const members = Array.isArray(data?.data) ? data.data : []

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
      <audio
        ref={audioRef}
        src={currentSong?.previewUrl}
        onEnded={handleSkipForward}
      />
    </div>
  );
};

