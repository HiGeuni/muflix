import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import temporaryData from "../temporaryData.json";

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
    p {
        margin-top: 0px;
        margin-bottom: 0px;
        font-size: 24px;
        font-weight: 700;
    }
    div {
        font-size : 16px;
        font-weight: 500;
        margin-top: 14px;
        margin-bottom: 14px;
    }
`

const RowSizedBox = styled.div`
    width : 5%;
`;

const MusicDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const musicData = temporaryData.music.filter((dd) => {
        return dd.id === 1;
    })
    console.log(musicData);
    return (
        <EntireArea>
            <RowSizedBox />
            {
                musicData.map((d) => (
                    <> 
                        <img src = {d.album_cover} alt="album2" />
                        <InformationArea>
                            <p>Song name</p>
                            <div>{d.name}</div>
                            <p>Singer</p>
                            <div>{d.singer}</div>
                            <p>Information</p>
                            <div>{d.information}</div>
                        </InformationArea>
                    </>
                ))
            }
        </EntireArea>
    );
}

export default MusicDetail;