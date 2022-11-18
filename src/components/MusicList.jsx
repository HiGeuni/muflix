import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SliderSettings from "./SliderSettings";
import Axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../config/api";

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

const CustomLink = styled(Link)`
    text-decoration: none;
`

const StyledLink = styled(Link)`
    display: fit-content;
    // width: 96%;
    max-width: 1100px;
    height: 100%;
    margin: 1rem;
    text-decoration: none;
    color: #000000;
    img {
        display: block;
        margin: auto;
        width: 200px;
        height: 200px;
    }
`


const CustomDiv = styled.div`
    font-family:"noto-sans";
    font-weight:600;
    // display: flex;
    text-align: center;
    justify-content: center;
`

const MusicList = () => {
    const [data, setData] = useState(null);

    const getData = async () => {
        await Axios.get(`${api.url}/musics/getAllMusics`)
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
                                <StyledLink to={{pathname: "/musicDetail"}}>
                                    <img
                                        src={s.album_cover}
                                        className="Album-Cover"
                                        alt="Album"
                                    /> <br />
                                    Title : {s.name} <br />
                                    Singer : {s.singer}
                                </StyledLink>
                            </UnMarkedli>
                                
                        )) 
                        : ""
                }
                <CustomLink to="/newMusicForm">
                    <AddMusic> {data ? "Add Music" : "Loading..."} </AddMusic>
                </CustomLink>
            </Slider>
        </CustomDiv>
    )
}

export default MusicList;