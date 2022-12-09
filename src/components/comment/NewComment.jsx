import Axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "config/api";
import { IsLogin } from "App";

const CustomDiv = styled.div`
    border: solid 2px black;
    border-radius: 5px;
    margin : 3.5%;
    width : 94%;
    form{
        display: flex;
        flex-direction: column;
        margin: 1%;
    }
    .textField{
        resize: none;
        font-size: 18px;
        height: 100px;
        margin-bottom: 1%;
    }
    .submitButton{
        margin-left: 94%;
        font-size: 18px;
    }
`

const CommentForm = () => {
    const params = useParams();
    const {isLogin} = useContext(IsLogin);
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        const token = localStorage.getItem('loging-token');
        console.log(data, params.index, token);
        await Axios.post(`${api.url}/comments/newComment/${params.index}`,
            data,
            {
                headers: {
                    "Authorization": token,
                    "withCredentials": true,
                    "Content-Type": "application/json",
                }
            }
        );
    }

    return (
        <CustomDiv>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <textarea className="textField" placeholder={isLogin?"Input Comment":"로그인이 필요합니다."} readOnly={!isLogin} {...register("comment")}/>
                {isLogin && 
                    <>
                        <div>
                            <input type="checkbox" {...register("anomymous")}/>익명
                        </div>
                        <input type="submit" className="submitButton" value="등록" />
                    </>
                }
            </form>
        </CustomDiv>
    )
}

export default CommentForm;