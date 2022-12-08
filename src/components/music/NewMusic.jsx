// react-hook-form을 이용해서 form을 만들기
import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import NewStyle from 'styles/FormStyle';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from 'config/api';
import Background from 'layouts/Background';

const NewMusicForm = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [dataObj, setData] = useState({});
    const {register, handleSubmit} = useForm();
    const isEdit = params.index ? true : false;

    const onSubmit = async (data) => {
        const res = isEdit
            ? await Axios.put(`${api.url}/musics/addMusic`,data)
            : await Axios.post(`${api.url}/musics/addMusic`,data);
            
        console.log(res);
        navigate('/');
    }
    
    const getMusicData = async () => {
        await Axios.get(`${api.url}/musics/getMusic/${params["index"]}`)
        .then((res) => {
            setData(res.data[0]);
        })
    }

    useEffect(() => {
        if(isEdit){
            console.log("Params : ", params);
            getMusicData();
        }
    }, []);

    return (
        <>
            <Background />
            <NewStyle>
                <h2>{isEdit?"Edit Music":"New Music"}</h2>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <label>Music name</label>
                    <input name="Name" value={dataObj?.name} placeholder="Music Name" {...register("name")} />
                    <label>Singer</label>
                    <input name="Singer" value={dataObj?.singer} placeholder="Singer" {...register("Singer")} />
                    <label>Album Cover</label>
                    <input name="cover" value={dataObj?.album_cover} placeholder="Album Cover Image" {...register("cover")} />
                    <input type="submit" className="submitButton" value="등록" />
                </form>
            </NewStyle>
        </>
    )
}

export default NewMusicForm;