import React, { useState, useEffect, useRef } from 'react';
import AudioControls from './AudioControls';
import { musicState } from 'atoms/music';
import { useRecoilState } from 'recoil';
// import './styles.css';
import { api } from 'config/api';
import styled from 'styled-components';
import Axios from 'axios';
import { toast } from 'react-toastify';

const StyledDiv = styled.div`
  display: block;
  position: fixed;
  bottom: 20px;
  right: 20px;
  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  input[type='range'] {
    height: 5px;
    -webkit-appearance: none;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 8px;
    background: #3b7677;
    transition: background 0.2s ease;
    cursor: pointer;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: red;
  }

  .audio-player {
    max-width: 350px;
    padding: 24px;
    border-radius: 20px;
    box-shadow: 0 28px 28px rgba(0, 0, 0, 0.25);
    background-color: black;
    margin: auto;
    color: var(--white);
  }

  .artwork {
    border-radius: 120px;
    display: block;
    margin: auto;
    height: 200px;
    width: 200px;
  }

  .track-info {
    color: white;
    text-align: center;
    z-index: 1;
    position: relative;
  }

  .remove-player {
    position: absolute;
    right: 20px;
    color: white;
    float: right;
    z-index: 100;
  }

  .title {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 4px;
  }

  .artist {
    font-weight: 200;
    font-size: 15px;
    margin-top: 0;
  }

  .audio-controls {
    display: flex;
    justify-content: space-between;
    width: 75%;
    margin: 0 auto 15px;
  }

  .audio-controls .prev svg,
  .audio-controls .next svg {
    width: 20px;
    height: 20px;
  }

  .audio-controls .play svg,
  .audio-controls .pause svg {
    height: 25px;
    width: 25px;
  }

  .audio-controls path {
    fill: var(--white);
  }
`;

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

  const setAudioData = async (index) => {
    audioRef.current.pause();
    const musicId = curMusicState.playlist[index].id;
    audioRef.current = new Audio(`${api.url}/musics/${musicId}.mp3`);

    await Axios.put(`${api.url}/musics/upstream/${musicId}`);

    setTrackProgress(audioRef.current.currentTime);
    audioRef.current.play();
    setMusicState((prev) => ({
      ...prev,
      isPlaying: true,
      curPlaying: index,
    }));
    startTimer();
    setCurMusicData(curMusicState.playlist[index]);
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        if (curMusicState.curPlaying === curMusicState.playlist.length - 1) {
          audioRef.current.pause();
          setMusicState((prev) => ({
            ...prev,
            isPlaying: false,
          }));
          setTrackProgress(0);
          clearTimer();
        } else {
          toNextTrack();
        }
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const clearTimer = () => {
    clearInterval(intervalRef.current);
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
      toast('첫 곡입니다.');
    } else {
      setAudioData(curMusicState.curPlaying - 1);
    }
  };

  const toNextTrack = () => {
    if (curMusicState.curPlaying < curMusicState.playlist.length - 1) {
      setAudioData(curMusicState.curPlaying + 1);
    } else {
      toast('마지막 곡입니다.');
    }
  };

  const removePlayer = () => {
    audioRef.current.pause();
    setTrackProgress(0);
    clearTimer();
    setMusicState({
      isPlaying: false,
      playlist: [],
      curPlaying: -1,
      newPlaylist: false,
    });
  };

  useEffect(() => {
    console.log('Mounted!');
    const index =
      curMusicState.curPlaying === -1 ? 0 : curMusicState.curPlaying;
    setAudioData(index);
  }, []);

  useEffect(() => {
    if (curMusicState.isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [curMusicState.isPlaying]);

  useEffect(() => {
    setAudioData(0);
  }, [curMusicState.newPlaylist]);

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
    <StyledDiv>
      <div className="audio-player">
        <button className="remove-player" onClick={removePlayer}>
          X
        </button>
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
    </StyledDiv>
  );
}

export default AudioPlayer;
