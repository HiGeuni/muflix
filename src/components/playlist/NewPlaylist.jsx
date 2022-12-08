// react-hook-form을 이용해서 form을 만들기
import {useForm} from "react-hook-form";
import NewStyle from "styles/FormStyle";
import { useState, useEffect } from "react";
import Axios from "axios";
import { api } from "config/api";
import Slider from "react-slick";
import SliderSettings from "config/SliderSettings";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

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
    const [playlistData, setPlayListData] = useState();
    const [resList, setRes] = useState([])
    const navigate = useNavigate();
    const params = useParams();
    const isEdit = params.index? true : false;

    const getData = async () => {
        await Axios.get(`${api.url}/musics/getAllMusics`)
        .then((res) => {
            setData(res.data);
        })
    }

    // for music Selection
    // const [musicData, setMusics] = useState([]);

    const fetchData = async () => {
        await Axios.get(`${api.url}/musics/getPlaylist/${params["index"]}`)
            .then((d) => {
                console.log(d.data.playlist_info);
                console.log(d.data.musics)
                setPlayListData(d.data.playlist_info);
                // for(let i of d.data.musics){
                //     Axios.get(`${api.url}/musics/getMusic/${i.music_id}`)
                //     .then((res) => {
                //         console.log(res.data[0]);
                //         const res2 = res.data;
                //         setMusics(prev => {
                //             return [...prev, ...res2];
                //         });
                //     })
                // }
            })
    };

    useEffect(() => {
        if(isEdit){
            fetchData();
        }
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
        if(data["name"] === ''){
            data["name"] = playlistData?.name;
        }
        if(data["information"] === ""){
            data["information"] = playlistData?.information;
        }
        data["musics"] = resList;
        // alert(JSON.stringify(data));
        let token = localStorage.getItem('loging-token');
        const headers = {
            "Authorization": token,
            "withCredentials": true,
            "Content-Type": "application/json",
        }
        isEdit
            ? await Axios.put(`${api.url}/musics/updatePlaylist/${params.index}`, data, {
                headers: headers
            })
            : await Axios.post(`${api.url}/musics/addPlaylist`, data, {
                headers: headers
            })
        ;
        navigate('/');
    }

    return (
        <>
            <NewStyle>
                <h2>{isEdit? "Edit Playlist": "New Playlist"}</h2>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <label>Playlist name</label>
                    <input type="text" name="name" defaultValue={playlistData?.name} placeholder="Playlist Name" {...register("name")} />
                    <label>Playlist information</label>
                    <input type="text" name="information" defaultValue={playlistData?.information} placeholder="Playlist Information" {...register("information")} />
                    
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