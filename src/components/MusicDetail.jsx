import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import temporaryData from "../temporaryData.json";

const EntireArea = styled.div`
    display : flex;
    // justify-content: center;
    img {
        display: block;
        width : 25%;
        height : 25%;
    }
    div {
        // display : flex;
    }
`;

const Header3 = styled.h3`

`;

const RowSizedBox = styled.div`
    width : 10%;
`;

const MusicDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const musicData = temporaryData.music.filter((dd) => {
        return dd.id === 12;
    })
    console.log(musicData);
    return (
        <EntireArea>
            <RowSizedBox />
            <img src = {musicData.album_cover} alt="album" />
            <Header3></Header3>
        </EntireArea>
    );
}

export default MusicDetail;