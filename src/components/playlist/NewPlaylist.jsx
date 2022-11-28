// react-hook-form을 이용해서 form을 만들기
import {useForm} from "react-hook-form";
import NewStyle from "styles/FormStyle";
import { useState } from "react";
import Axios from "axios";
import { api } from "config/api";
import { useEffect } from "react";
import Slider from "react-slick";
import SliderSettings from "config/SliderSettings";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UnMarkedli = styled.li`
    display: flex;
    align-items: center;
    list-style: none;
`

const CustomDiv = styled.div`
    text-decoration: none;
    color : #000000;
    img { 
        display : block;
        margin: auto;
        width : 200px;
        height : 200px;
    }
`

const SizedBox = styled.div`
    display: block;
    height : 50px;
`


const NewPlayListForm = () => {
    const {register, handleSubmit} = useForm();
    const [musicData, setData] = useState(null);
    const [resList, setRes] = useState([])
    const navigate = useNavigate();

    const getData = async () => {
        await Axios.get(`${api.url}/musics/getAllMusics`)
        .then((res) => {
            setData(res.data);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    const onChange = (id, e) => {
        if (resList.includes(id)){
            setRes(resList.filter((el) => el !== id));            
        }else{
            setRes(prev => [...prev, id]);
        }
        console.log(resList)
    };
    
    const onSubmit = async (data) => {
        data["musics"] = resList;
        alert(JSON.stringify(data));
        // await Axios.post(`${api.url}/musics/addPlaylist`, data);
        // navigate('/');
    }

    return (
        <>
            <NewStyle>
                <h2>New Playlist</h2>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <label>Playlist name</label>
                    <input name="name" placeholder="Playlist Name" {...register("name")} />
                    <label>Playlist information</label>
                    <input name="information" placeholder="Playlist Information" {...register("information")} />
                    
                    <Slider {...SliderSettings}>
                        {
                            musicData?.map((s) => (
                                <UnMarkedli key = {s.id}>
                                    <CustomDiv >
                                        <input type="checkbox" name={`${s.id}`} onChange={(e) => {onChange(s.id, e)}} />
                                        <img
                                            src={s.album_cover}
                                            className="Album-Cover"
                                            alt="Album"
                                        /> <br />
                                        Title : {s.name} <br />
                                        Singer : {s.singer}
                                    </CustomDiv>
                                </UnMarkedli>
                            ))
                        }
                    </Slider>
                    <SizedBox />
                    <input type="submit" className="submitButton" value="등록" />
                </form>
            </NewStyle>
        </>
    )
}

export default NewPlayListForm;