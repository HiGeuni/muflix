import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { api } from 'config/api';
import { useRecoilState } from 'recoil';
import ReactAudioPlayer from 'react-audio-player';
import { musicState } from 'atoms/music';

const EntireArea = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  display: flex;
  // justify-content: center;
  img {
    min-width: 250px;
    min-height: 250px;
    margin-right: 3%;
    display: block;
    width: 25%;
    height: 25%;
  }
  div {
    // display : flex;
  }
`;

const InformationArea = styled.div`
  width: 100%;
  // display : flex;
  // flex-direction: column;
`;

const SongName = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 40px;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const SingerName = styled.div`
  display: flex;
  margin-bottom: 5%;
  font-weight: 600;
  font-size: 24px;
  color: #4c5068;
`;

const RowSizedBox = styled.div`
  width: 5%;
`;

const ButtonArea = styled.div`
  display: flex;
  // justify-content: center;
  flex-direction: row;
`;

const AddButton = styled.button`
  min-width: 240px;
  font-size: 18px;
  font-weight: 600;
  background-color: black;
  color: white;
  margin-left: 5%;
`;

function MusicDetail() {
  const params = useParams();
  const [dataObj, setData] = useState({});
  const [curMusicState, setMusicState] = useRecoilState(musicState);
  const [musicUrl, setMusicUrl] = useState(null);

  const getMusicData = async () => {
    await Axios.get(`${api.url}/musics/getMusic/${params.index}`).then(
      (res) => {
        setData(res.data[0]);
      },
    );
    setMusicUrl(`${api.url}/musics/${params.index}.mp3`);
  };

  useEffect(() => {
    console.log(curMusicState);
    getMusicData();
  }, []);

  const AddMusicToPlaylist = () => {
    setMusicState((prev) => {
      const tempList = { ...prev };
      tempList.playlist = [...prev.playlist, dataObj];
      return tempList;
    });
  };

  return (
    <EntireArea>
      <RowSizedBox />
      <img src={dataObj.album_cover} alt="album2" />
      <InformationArea>
        <SongName>{dataObj.name}</SongName>
        <SingerName>{dataObj.singer}</SingerName>
        <ButtonArea>
          <ReactAudioPlayer src={musicUrl} controls />
          <AddButton onClick={AddMusicToPlaylist}>
            ✚ 현재 재생목록에 추가
          </AddButton>
        </ButtonArea>
      </InformationArea>
    </EntireArea>
  );
}

export default MusicDetail;
