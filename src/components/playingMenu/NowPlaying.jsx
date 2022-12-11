import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { musicState } from 'atoms/music';
import Axios from 'axios';
import { api } from 'config/api';
import ReactAudioPlayer from 'react-audio-player';
import prevSong from 'static/musicControl/back.png';
import nextSong from 'static/musicControl/next.png';

const Wrapper = styled.div`
  display: block;
  position: fixed;
  bottom: 0px;
  width: 92%;
  margin-right: 4%;
  margin-left: 4%;
  background-color: rgba(#000, 0.3);
`;

const PlaylistDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px;
  background-color: rgba(#000, 0.3);
  .album-cover {
    padding: 10px;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .music-info-area {
    display: flex;
    align-items: center;
  }
  .music-info {
    min-width: 300px;
    border: solid 1px;
    display: block;
    .title {
      font-size: 20px;
      font-weight: 700;
      margin: 3%;
      border: solid 1px;
    }
    .singer {
      font-size: 14px;
      display: flex;
      margin: 3%;
      border: solid 1px;
    }
  }
  .music-info-area {
    border: solid 1px;
  }
  .control {
    display: flex;
    min-width: 500px;
    align-items: center;
    margin: 1%;
    border: solid 1px;
    img {
      width: 30px;
      height: 30px;
    }
    * {
      font-size: 18px;
      margin: 3%;
    }
  }
  .playlist {
    margin: 2%;
    font-size: 24px;
    border: solid 1px;
  }
  .close {
    margin: 2%;
  }
`;

function NowPlaying() {
  // const [audio, setAudio] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [curMusicState, setMusicState] = useRecoilState(musicState);
  const [curMusicData, setCurMusicData] = useState(null);

  const setAudioData = async (index) => {
    const musicId = curMusicState.playlist[index].id;

    setMusicState((prev) => ({
      ...prev,
      isPlaying: false,
      curPlaying: index,
    }));

    setAudioURL(`${api.url}/musics/${musicId}.mp3`);

    await Axios.get(`${api.url}/musics/getMusic/${musicId}`).then((res) => {
      setCurMusicData(res.data[0]);
    });
  };

  const onClickPrev = () => {
    if (
      curMusicState.curPlaying > 0 &&
      curMusicState.curPlaying < curMusicState.playlist.length
    ) {
      setAudioData(curMusicState.curPlaying - 1);
    } else if (curMusicState.curPlaying === 0) {
      alert('첫 곡입니다.');
    }
  };

  const onClickNext = () => {
    if (curMusicState.curPlaying < curMusicState.playlist.length - 1) {
      setAudioData(curMusicState.curPlaying + 1);
    } else if (curMusicState.curPlaying === curMusicState.playlist.length - 1) {
      alert('마지막 곡입니다.');
    }
  };

  const onClickClose = () => {
    // audio.pause();
    setMusicState((prev) => ({
      ...prev,
      playlist: [],
      curPlaying: -1,
      isPlaying: false,
    }));
  };

  useEffect(() => {
    setAudioData(0);
  }, []);

  return (
    <Wrapper>
      <PlaylistDiv>
        <div className="control">
          <button type="button" onClick={onClickPrev}>
            <img src={prevSong} alt="back" />
          </button>
          <ReactAudioPlayer src={audioURL} controls autoPlay />
          <button type="button" onClick={onClickNext}>
            <img src={nextSong} alt="next" />
          </button>
        </div>
        <div className="music-info-area">
          <div className="album-cover">
            <img src={curMusicData?.album_cover} alt="" />
          </div>
          <div className="music-info">
            <div className="title">
              {curMusicData ? curMusicData.name : '데이터를 불러오는 중입니다.'}
            </div>
            <div className="singer">
              {curMusicData ? curMusicData.singer : ''}
            </div>
          </div>
        </div>
        <div className="playlist">⏏</div>
        <button type="button" className="close" onClick={onClickClose}>
          X
        </button>
      </PlaylistDiv>
    </Wrapper>
  );
}

export default NowPlaying;
