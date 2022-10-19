// react-hook-form을 이용해서 form을 만들기
import React from 'react';
import {useForm} from "react-hook-form";
import NewStyle from "./Style";

function NewMusicForm(){
    
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