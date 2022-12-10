import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { musicState } from 'atoms/music';
import music from "static/MeetOnlyInDream.mp3";
import Axios from "axios";
import { api } from "config/api";
import { Await } from "react-router-dom";

const PlaylistDiv = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    margin-top: 5%;
    border: solid 1px;
    .album-cover {
        padding: 20px;
        margin: 1%;
        border: solid 1px;
    }
    .music-info {
        min-width: 300px;
        border: solid 1px;
        display: block;
        .title {
            font-size: 20px;
            margin: 5%;
            border: solid 1px;
        }
        .singer {
            font-size: 16px;
            display: flex;
            margin: 5%;
            border: solid 1px;
        }
    }
    .control {
        display: flex;
        // min-width: 200px;
        margin: 1%;
        border: solid 1px;
        *{
            font-size: 24px;
            margin: 30%;
        }
    }
    .playlist {
        margin: 2%;
        font-size: 24px;
        border: solid 1px;
    }
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

const NowPlaying = () => {
    const [audio, setAudio] = useState(null);
    const [curMusicState, setMusicState] = useRecoilState(musicState);
    const [curMusicData, setCurMusicData] = useState(null);

    const setAudioData = async (audio) => {
        const musicId = curMusicState.playlist[audio];
        setMusicState(prev => {
            let tempList = Object.assign({}, prev);
            tempList.curPlaying = audio;
            return tempList
        });
        setAudio(new Audio(`${api.url}/musics/${musicId}.mp3`));
        await Axios.get(`${api.url}/musics/getMusic/${musicId}`)
        .then((res) => {
            setCurMusicData(res.data[0]);
        });
    }

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
        setMusicState(prev => {
            let tempList = Object.assign({}, prev);
            tempList.isPlaying = !prev.isPlaying;
            tempList.isPlaying ? audio?.play() : audio?.pause();
            return tempList;
        });
    } 

    useEffect(()=>{
        setAudioData(0);
    },[])

    return (
        <PlaylistDiv>
            <div className="album-cover">
                {/* img 태그 */}
                네모
            </div>
            <div className="music-info">
                <div className="title">{curMusicData?curMusicData.name:"데이터를 불러오는 중입니다."}</div>
                <div className="singer">{curMusicData?curMusicData.singer:""}</div>
            </div>
            <div className="control">
                <div>
                    ⏮
                </div>
                <div onClick={toggle}>{curMusicState.isPlaying ? "⏸" : "▶️"}</div>
                <div>
                    ⏭
                </div>
            </div>
            <div className="playlist">⏏</div>
            
        </PlaylistDiv>
    );
}

export default NowPlaying;