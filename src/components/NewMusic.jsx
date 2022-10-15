// react-hook-form을 이용해서 form을 만들기
import React, { useRef, useState } from 'react';
import {useForm} from "react-hook-form";
import NewStyle from "./Style";
import musicData from "../data.json";

function NewMusicForm(){
    // const [inputs, setInputs] = useState({
    //     name: '',
    //     singer: '',
    //     album_cover: ''
    // });

    // const [music, setMusic] = useState({ musicData });

    // const {name, singer, album_cover} = inputs;

    // const onChange = (e) => {
    //     const {name, value} = e.target;
    //     setInputs({
    //         ...inputs,
    //         [name] : value
    //     });
    // };

    // const nextId = useRef(musicData.music.length);

    // const onCreate = () => {
    //     const newMusic = {
    //         id: nextId.current,
    //         name,
    //         singer,
    //         album_cover
    //     };
    //     setUsers([...music, newMusic])
    //     setInputs({
    //         name: '',
    //         singer: '',
    //         album_cover
    //     });
    //     nextId.current += 1;
    // };

    // const onSubmit = (data) => {
    //     const newMusic = {
    //         id: nextId.current,
    //         // data.name,
    //         // data.singer,
    //         // data.album_cover
    //     };
    //     setMusic([...music, newMusic])
    //     nextId.current += 1;
    // }
    
    const {register, handleSubmit} = useForm();

    return (
        <>
            <NewStyle>
                <h2>New Music</h2>
                <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
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