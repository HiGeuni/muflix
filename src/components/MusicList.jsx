import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SliderSettings from "./SliderSettings";
import Axios from "axios";
import { useEffect, useState } from "react";

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

const CustomLink = styled(Link)`
    text-decoration: none;
`

const CustomDiv = styled.div`
    // display: flex;
    text-align: center;
    justify-content: center;
`

const MusicList = () => {
    const [data, setData] = useState(null);

    const getData = async () => {
        await Axios.get("http://localhost:4000/musics/getAllMusics")
        .then((res) => {
            setData(res.data);
            console.log(data);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <CustomDiv>
            <h2>Music List</h2>
            <Slider {...SliderSettings}>
                {
                    data 
                        ? data.map((s) => (
                            <UnMarkedli key = {s.musicId}>
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
                        )) 
                        : <div>{console.log("asdfas " + data)} loading...</div>
                }
                <CustomLink to="/newMusicForm">
                    <AddMusic> Add Music </AddMusic>
                </CustomLink>
            </Slider>
        </CustomDiv>
    )
}

export default MusicList;