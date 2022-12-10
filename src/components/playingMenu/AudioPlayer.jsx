import React, { useState, useEffect, useRef } from 'react';
import AudioControls from './AudioControls';
import { musicState } from 'atoms/music';
import { useRecoilState } from 'recoil';
import './styles.css';
import { api } from 'config/api';
import Axios from 'axios';

function AudioPlayer() {
  // isplaying, curPlaying
  const [curMusicState, setMusicState] = useRecoilState(musicState);
  const [trackProgress, setTrackProgress] = useState(0);
  const [curMusicData, setCurMusicData] = useState(null);

  // Refs
  const audioRef = useRef(
    new Audio(`${api.url}/musics/${curMusicState.playlist[0].id}.mp3`),
  );
  const intervalRef = useRef();

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const getMusicUrl = (index) => {
    const musicId = curMusicState.playlist[index].id;
    return `${api.url}/musics/${musicId}.mp3`;
  };

  const setAudioData = (index) => {
    audioRef.current.pause();
    audioRef.current = new Audio(getMusicUrl(index));
    setTrackProgress(audioRef.current.currentTime);
      // audioRef.current.play();
    setMusicState((prev) => ({
        ...prev,
        isPlaying: false,
        curPlaying: index,
    }));
    startTimer();
    setCurMusicData(curMusicState.playlist[index]);
    console.log(curMusicData);
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const setIsPlaying = (state) => {
    setMusicState((prev) => ({
      ...prev,
      isPlaying: state,
    }));
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!curMusicState.isPlaying) {
      setMusicState((prev) => ({
        ...prev,
        isPlaying: true,
      }));
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (curMusicState.curPlaying - 1 < 0) {
      alert('첫 곡입니다.');
    } else {
      setAudioData(curMusicState.curPlaying - 1);
    }
  };

  const toNextTrack = () => {
    if (curMusicState.curPlaying < curMusicState.playlist.length - 1) {
      setAudioData(curMusicState.curPlaying + 1);
    } else {
      alert('마지막 곡입니다.');
    }
  };

  useEffect(() => {
    setAudioData(0);
  }, []);

  useEffect(() => {
    if (curMusicState.isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [curMusicState.isPlaying]);

  useEffect(
    () =>
      // Pause and clean up on unmount
      () => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      },
    [],
);

  return (
    <div className="audio-player">
      <div className="track-info">
        <img
          className="artwork"
          src={curMusicData?.album_cover}
          alt={`track artwork for ${curMusicData?.name} by ${curMusicData?.singer}`}
        />
        <h2 className="title">{curMusicData?.name}</h2>
        <h3 className="artist">{curMusicData?.singer}</h3>
        <AudioControls
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration || `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
