import React from 'react';
import { ReactComponent as Play } from 'static/musicControl/play.svg';
import { ReactComponent as Pause } from 'static/musicControl/pause.svg';
import { ReactComponent as Next } from 'static/musicControl/next.svg';
import { ReactComponent as Prev } from 'static/musicControl/prev.svg';
import { musicState } from 'atoms/music';
import { useRecoilState } from 'recoil';

function AudioControls({ onPlayPauseClick, onPrevClick, onNextClick }) {
  const [curMusicState, setMusicState] = useRecoilState(musicState);
  return (
    <div className="audio-controls">
      <button
        type="button"
        className="prev"
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <Prev />
      </button>
      {curMusicState.isPlaying ? (
        <button
          type="button"
          className="pause"
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          <Pause />
        </button>
      ) : (
        <button
          type="button"
          className="play"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <Play />
        </button>
      )}
      <button
        type="button"
        className="next"
        aria-label="Next"
        onClick={onNextClick}
      >
        <Next />
      </button>
    </div>
  );
}

export default AudioControls;
