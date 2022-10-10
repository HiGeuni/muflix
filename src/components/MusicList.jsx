// 이렇게 화면 구성을 했는데, 얘네들을 내가 원하는 모양으로 만들기 위해선 어떻게 해야 할 지?

import musicData from "../data.json";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AddMusic = styled.div`
    display: flex;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    background-color:#d2e7e8;
    // padding: 40px;
    width: 200px;
    height: 200px;
`

const UnMarkedli = styled.li`
    list-style: none;
`

const Music = styled.div`
    display: fit-content;
    // width: 96%;
    max-width: 1100px;
    height: 100%;
    margin: 1rem;
    align-items: center;
    justify-content: space-between;
    img {
        width: 200px;
        height: 200px;
    }
`

const MusiclistStyle = styled.div`
    display: fixed;
`
function MusicList(){
    return (
        <>
            <h2>Music List</h2>
            <MusiclistStyle>
                { musicData.music.map((s) => (
                    <UnMarkedli key = {s.id}>
                        <Music>
                            <img
                                src={`${process.env.PUBLIC_URL}/album_cover/${s.album_cover}`}
                                className="Album-Cover"
                                alt="Album"
                            /> <br />
                            Title : {s.name} <br />
                            Singer : {s.singer}
                        </Music>
                    </UnMarkedli>
                ))}
                <Link to="/newMusicForm">
                    <AddMusic> Add Music </AddMusic>
                </Link>
            </MusiclistStyle>
        </>
    )
}

export default MusicList;