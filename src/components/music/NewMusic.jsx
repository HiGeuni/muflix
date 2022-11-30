// react-hook-form을 이용해서 form을 만들기
import React from 'react';
import {useForm} from "react-hook-form";
import NewStyle from 'styles/FormStyle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from 'config/api';

const NewMusicForm = () => {
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // const res = await axios.post(`${api.url}/musics`,data);
        const res = await axios.post(`http://localhost:8080/musics`, data);
        console.log(res);
        navigate('/');
    }
    const {register, handleSubmit} = useForm();

    return (
        <>
            <NewStyle>
                <h2>New Music</h2>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <label>Music name</label>
                    <input name="Name" placeholder="Music Name" {...register("name")} />
                    <label>Singer</label>
                    <input name="Singer" placeholder="Singer" {...register("Singer")} />
                    <label>Album Cover</label>
                    <input name="cover" placeholder="Album Cover Image" {...register("cover")} />
                    <input type="submit" className="submitButton" value="등록" />
                </form>
            </NewStyle>
        </>
    )
}

export default NewMusicForm;