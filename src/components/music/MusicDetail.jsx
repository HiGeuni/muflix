import { React, useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { api } from "config/api";
import Comment from "components/Comment";
import { useRecoilState } from "recoil";
import { musicState } from "atoms/music";

const EntireArea = styled.div`
    margin-top : 5%;
    display : flex;
    // justify-content: center;
    img {
        margin-right: 3%;
        display: block;
        width : 25%;
        height : 25%;
    }
    div {
        // display : flex;
    }
`;

const InformationArea = styled.div`
    width : 100%
    // display : flex;
    // flex-direction: column;
`
// margin을 퍼센트로 정하고 싶은데...
const SongName = styled.div`
    display: flex;
    font-weight: 700;
    font-size: 40px;
    margin-top: 5%;
    margin-bottom : 5%;
`

const SingerName = styled.div`
    display: flex;
    margin-bottom: 5%;
    font-weight: 600;
    font-size: 24px;
    color: #4C5068;
`

const RowSizedBox = styled.div`
    width : 5%;
`;

const ButtonArea = styled.div`
    display: flex;
    // justify-content: center;
    flex-direction: row;
`

const PlayButton = styled.button`
    width: 80px;
    height: 40px;
    font-size: 18px;
    font-weight: 600;
    margin-right: 3%;
    background-color: white;
`

const AddButton = styled.button`
    width: 200px;
    font-size: 18px;
    font-weight: 600;
    background-color: black;
    color : white;
`

const MusicDetail = () => {
    const params = useParams();
    const [dataObj, setData] = useState({});
    const [curMusicState, setMusicState] = useRecoilState(musicState);
    console.log(curMusicState);
    const getMusicData = async () => {
        await Axios.get(`${api.url}/musics/getMusic/${params["index"]}`)
        .then((res) => {
            setData(res.data[0]);
        })
    }
    
    useEffect(() => {
        getMusicData();
    }, []);

    const AddMusicToPlaylist = () => {
        const id = params.index;
        setMusicState(prev => {
            let tempList = Object.assign({}, prev);
            tempList.playlist = [...prev.playlist, id];
            return tempList;
        });
    }

    return (
        <>
            <EntireArea>
                <RowSizedBox />
                <img src = {dataObj.album_cover} alt="album2" />
                <InformationArea>
                    <SongName>{dataObj.name}</SongName>
                    <SingerName>{dataObj.singer}</SingerName>
                    <ButtonArea>
                        <PlayButton>
                            ▶️ 재생
                        </PlayButton>
                        <AddButton onClick={AddMusicToPlaylist}>
                            ✚ 플레이리스트에 추가
                        </AddButton>
                    </ButtonArea>
                </InformationArea>
            </EntireArea>
            <Comment />
        </>
    );
}

export default MusicDetail;