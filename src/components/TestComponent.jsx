import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { musicState } from 'atoms/music';
import music from 'static/MeetOnlyInDream.mp3';

const PlaylistDiv = styled.div`
  display: flex;
  margin-left: 13%;
  margin-top: 5%;
`;

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

function TestComponent({ url }) {
  const [audio] = useState(new Audio(music));
  const [curMusicState, setMusicState] = useRecoilState(musicState);

  // useEffect(() => {
  //     audio.addEventListener('ended', () => setMusicState(prev => {
  //         let tempList = Object.assgin({}, prev);
  //     }));
  //     return () => {
  //       audio.removeEventListener('ended', () => setMusicState(prev => {

  //       }));
  //     };
  //   }, []);

  const toggle = () => {
    setMusicState((prev) => {
      const tempList = { ...prev };
      tempList.isPlaying = !prev.isPlaying;
      tempList.isPlaying ? audio.play() : audio.pause();
      return tempList;
    });
  };

  return (
    <PlaylistDiv>
      <button onClick={toggle}>{curMusicState.isPlaying ? '⏸' : '▶️'}</button>
    </PlaylistDiv>
  );
}

export default TestComponent;
