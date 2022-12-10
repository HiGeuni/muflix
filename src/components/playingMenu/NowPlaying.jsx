import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { musicState } from 'atoms/music';
import Axios from "axios";
import { api } from "config/api";
import { Link } from "react-router-dom";

// .header {
//     display: block;
//     font-size: 40px;
//     position: fixed;
//     width: 100%;
//     height: 80px;
//     background-color: rgba($color: #000000, $alpha: 0.75);
//     z-index: 8;
// }

const Wrapper = styled.div`
    display: block;
    position: fixed;
    bottom: 0px;
    width: 92%;
    margin-right: 4%;
    margin-left: 4%;
    background-color: rgba(#000, .3);
`

const PlaylistDiv = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    border: solid 1px;
    background-color: rgba(#000, .3);
    .album-cover {
        padding: 10px;
        img{
            width: 100px;
            height: 100px;
        }
    }
    .music-info {
        min-width: 300px;
        border: solid 1px;
        display: block;
        .title {
            font-size: 20px;
            margin: 3%;
            border: solid 1px;
        }
        .singer {
            font-size: 16px;
            display: flex;
            margin: 3%;
            border: solid 1px;
        }
    }
    .control {
        display: flex;
        // min-width: 200px;
        margin: 1%;
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

const NowPlaying = () => {
    const [audio, setAudio] = useState(null);
    const [curMusicState, setMusicState] = useRecoilState(musicState);
    const [curMusicData, setCurMusicData] = useState(null);

    const setAudioData = async (index) => {
        const musicId = curMusicState.playlist[index];
        setMusicState(prev => {
            let tempList = Object.assign({}, prev);
            tempList.isPlaying = false;
            tempList.curPlaying = index;
            return tempList
        });
        setAudio(new Audio(`${api.url}/musics/${musicId}.mp3`));

        await Axios.get(`${api.url}/musics/getMusic/${musicId}`)
        .then((res) => {
            setCurMusicData(res.data[0]);
        });

        audio?.addEventListener('ended', () => setMusicState((prev) => {
            let tempList = Object.assign({}, prev);
            tempList.isPlaying = false;
            return tempList;
        }));
        return () => {
            audio?.removeEventListener('ended', () => setMusicState((prev) => {
                let tempList = Object.assign({}, prev);
                tempList.isPlaying = false;
                return tempList;
            }));
      };
    }
    
    const onClickPrev = () => {
        if(curMusicState.curPlaying > 0 && curMusicState.curPlaying < curMusicState.playlist.length){
            audio.pause();
            setAudioData(curMusicState.curPlaying - 1);
        }else if(curMusicState.curPlaying === 0){
            alert("첫 곡입니다.");
        }
    }

    const onClickNext = () => {
        if(curMusicState.curPlaying < curMusicState.playlist.length-1){
            audio.pause();
            setAudioData(curMusicState.curPlaying + 1);
        }else if(curMusicState.curPlaying === curMusicState.playlist.length-1){
            alert("마지막 곡입니다.");
        }
    }

    const onClickPlay = () => {
        setMusicState(prev => {
            let tempList = Object.assign({}, prev);
            tempList.isPlaying = !prev.isPlaying;
            tempList.isPlaying ? audio?.play() : audio?.pause();
            return tempList;
        });
    } 

    const onClickShowPlayList = () => {

    }

    useEffect(()=>{
        setAudioData(0);
    },[])

    return (
        <Wrapper>
            <PlaylistDiv>
                <div className="album-cover">
                    <img src={curMusicData?.album_cover} alt="" />
                </div>
                <div className="music-info">
                    <div className="title">{curMusicData?curMusicData.name:"데이터를 불러오는 중입니다."}</div>
                    <div className="singer">{curMusicData?curMusicData.singer:""}</div>
                </div>
                <div className="control">
                    <div onClick={onClickPrev}>
                        ⏮
                    </div>
                    <div onClick={onClickPlay}>{curMusicState.isPlaying ? "⏸" : "▶️"}</div>
                    <div onClick={onClickNext}>
                        ⏭
                    </div>
                </div>
                <div className="playlist">⏏</div>
            </PlaylistDiv>
        </Wrapper>
    );
}

export default NowPlaying;