import { React, useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { api } from "config/api";

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
    const [dataObj, setData] = useState({});

    const getMusicData = async () => {
        await Axios.get(`${api.url}/musics/getMusic/${params["index"]}`)
        .then((res) => {
            setData(res.data[0]);
        })
    }
    
    useEffect(() => {
        getMusicData();
    });

    return (
        <EntireArea>
            <RowSizedBox />
                <img src = {dataObj.album_cover} alt="album2" />
                <InformationArea>
                    <p>Song name</p>
                    <div>{dataObj.name}</div>
                    <p>Singer</p>
                    <div>{dataObj.singer}</div>
                    <p>Information</p>
                    <div>{dataObj.information}</div>
                </InformationArea>
        </EntireArea>
    );
}

export default MusicDetail;