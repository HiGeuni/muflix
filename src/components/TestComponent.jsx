import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PlaylistDiv = styled.div`
    display: flex;
    margin-left: 13%;
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
    const [playing, toggle] = useAudio(url);

    return (
        <PlaylistDiv>
            <button onClick={toggle}>{playing ? "▶️" : "⏸"}</button>
        </PlaylistDiv>
    );
};

export default TestComponent;