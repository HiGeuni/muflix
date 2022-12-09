import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { musicState } from 'atoms/music';

const PlaylistDiv = styled.div`
    display: flex;
    margin-left: 13%;
    margin-top: 5%;
`

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);
  
    return [playing, toggle];
};
  
const TestComponent = ({ url }) => {
    const [curMusicState, setMusicState] = useRecoilState(musicState);

    const toggle = () => {
        setMusicState(prev => {
            let tempList = Object.assign({}, prev);
            tempList.isPlaying = !prev.isPlaying;
            return tempList;
        });
    } 

    return (
        <PlaylistDiv>
            <button onClick={toggle}>{curMusicState.isPlaying ? "▶️" : "⏸"}</button>
        </PlaylistDiv>
    );
};

export default TestComponent;