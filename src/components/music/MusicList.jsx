import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SliderSettings from "config/SliderSettings";
import Axios from "axios";
import { useEffect, useState } from "react";
import { api } from "config/api";

import "styles/slick-theme.css";
import "styles/slick.css";
import Comment from "components/Comment";


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
    display: block;
    align-items: center;
    list-style: none;
`

const CustomLink = styled(Link)`
    text-decoration: none;
`

const StyledLink = styled(Link)`
    // display: flex;
    margin:auto;
    max-width: 1100px;
    height: 100%;
    text-decoration: none;
    color: #000000;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
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
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <CustomDiv>
            <Slider {...SliderSettings}>
                {
                    data?.map((s) => (
                            <UnMarkedli key = {s.id}>
                                <StyledLink to={{pathname: "/musicDetail/"+s.id}}>
                                    <img
                                        src={s.album_cover}
                                        className="Album-Cover"
                                        alt="Album"
                                    /> <br />
                                </StyledLink>
                                Title : {s.name} <br />
                                Singer : {s.singer}
                            </UnMarkedli>
                        ))
                }
                <CustomLink to="/newMusicForm">
                    <AddMusic> {data ? "Add Music" : "Loading..."} </AddMusic>
                </CustomLink>
            </Slider>
            <Comment />
        </CustomDiv>
    )
}

export default MusicList;