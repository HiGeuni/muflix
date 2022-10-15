// 이렇게 화면 구성을 했는데, 얘네들을 내가 원하는 모양으로 만들기 위해선 어떻게 해야 할 지?

import musicData from "../data.json";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "../styles/slick-theme.css";
import "../styles/slick.css";

const AddMusic = styled.div`
    display: flex;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    background-color:#d2e7e8;
    // padding: 40px;
<<<<<<< HEAD
=======
    // margin: auto;
>>>>>>> 217c24b532d8f65ef6d468ecab49a860e9a2b2c1
    width: 200px;
    height: 200px;
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

// const CenteredSlider = styled(Slider)`
//     display: flex;
//     text-align: center;
//     justify-content : center;
// `

const CustomDiv = styled.div`
    // display: flex;
    text-align: center;
    justify-content: center;
`

function MusicList(){
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2
    };
    return (
        <CustomDiv>
            <h2>Music List</h2>
            <Slider {...settings}>
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