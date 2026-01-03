'use client';

import { useState, useEffect, useRef } from 'react';
import { Music, Pause, Play } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [hasTriedAutoplay, setHasTriedAutoplay] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio sources
  const PRIMARY_AUDIO_URL = '/audio/petshop-music.mp3';
  const FALLBACK_AUDIO_URL =
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  /**
   * Audio event listeners
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setAudioError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      const errorCode = audio.error?.code;
      let errorMessage = 'Audio playback error';

      switch (errorCode) {
        case 1:
          errorMessage = 'Audio loading aborted';
          break;
        case 2:
          errorMessage = 'Network error - trying fallback';
          break;
        case 3:
          errorMessage = 'Audio format not supported';
          break;
        case 4:
          errorMessage = 'Audio source not supported';
          break;
      }

      console.error(`Audio Error: ${errorMessage}`, audio.error);
      setAudioError(errorMessage);
      setShowToast(true);
      setIsPlaying(false);

      // Fallback audio
      if (audio.src.includes(PRIMARY_AUDIO_URL)) {
        console.log('Switching to fallback audio...');
        audio.src = FALLBACK_AUDIO_URL;
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  /**
   * AUTOPLAY on first load (Safari-friendly)
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasTriedAutoplay) return;

    audio.muted = true; // required by autoplay policy
    audio.volume = 0.8;

    audio
      .play()
      .then(() => {
        audio.muted = false;
        setIsPlaying(true);
        setShowToast(false);
        setAudioError(null);
        console.log('Autoplay success');
      })
      .catch((err) => {
        console.warn('Autoplay blocked:', err.message);
        setShowToast(true);
      })
      .finally(() => {
        setHasTriedAutoplay(true);
      });
  }, [hasTriedAutoplay]);

  /**
   * Play / Pause toggle (manual)
   */
  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        audio.muted = false;
        setIsPlaying(true);
        setShowToast(false);
        setAudioError(null);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Playback error';
      console.error('Toggle error:', message);
      setAudioError(message);
      setShowToast(true);
      setIsPlaying(false);
    }
  };

  /**
   * Auto hide toast
   */
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={togglePlayPause}
        className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-petshop-primary to-petshop-accent shadow-glow-lg hover:scale-110 transition-all duration-300 text-white"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 fill-white" />
        ) : (
          <Play className="w-8 h-8 fill-white ml-1" />
        )}
      </button>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-28 right-8 z-50 bg-petshop-dark text-white px-6 py-3 rounded-2xl shadow-lg animate-fade-in-up">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4" />
            <span className="text-sm font-medium">
              Click to play your petshop music 🎵
            </span>
          </div>
        </div>
      )}

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={PRIMARY_AUDIO_URL}
        loop
        preload="auto"
        playsInline
        crossOrigin="anonymous"
      >
        <source src={PRIMARY_AUDIO_URL} type="audio/mpeg" />
        <source src={FALLBACK_AUDIO_URL} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};