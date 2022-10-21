// 이렇게 화면 구성을 했는데, 얘네들을 내가 원하는 모양으로 만들기 위해선 어떻게 해야 할 지?

import musicData from "../data.json";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SliderSettings from "./SliderSettings";

// cascading issue?
// styled component와 css를 같이 사용해서 생길수도
import "../styles/slick-theme.css";
import "../styles/slick.css";

const AddMusic = styled.div`
    display: flex;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    width: 190px;
    height: 190px;
    background-color:#0c0c0c;
    color: #AF2F2c;
    font-size: 24px;
    font-weight: 700;
    border: #AF2F2c 5px solid;
`

const UnMarkedli = styled.li`
    display: flex;
    align-items: center;
    list-style: none;
`

const Music = styled.div`
    display: fit-content;
    // width: 96%;
    max-width: 1100px;
    height: 100%;
    margin: 1rem;
    img {
        display: block;
        margin: auto;
        width: 200px;
        height: 200px;
    }
`

const CustomDiv = styled.div`
    // display: flex;
    text-align: center;
    justify-content: center;
`

const MusicList = () => {
    return (
        <CustomDiv>
            <h2>Music List</h2>
            <Slider {...SliderSettings}>
                { musicData.music.map((s) => (
                    <UnMarkedli key = {s.id}>
                        <Music>
                            <img
                                src={s.album_cover}
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
            </Slider>
        </CustomDiv>
    )
}

export default MusicList;