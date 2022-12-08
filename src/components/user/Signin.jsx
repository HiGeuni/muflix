// react-hook-form을 이용해서 form을 만들기
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from "config/api";
import { IsLogin } from "App";
import { useContext } from "react";
import { Link } from "react-router-dom";

import Background from "layouts/Background";

const NewStyle = styled.div`
    display: block;
    background-color: black;
    margin: 5%;
    @media only screen and (min-width: 740px){
        background-color: rgba(0,0,0,.90);
        padding: 60px;
        max-width: 600px;
        min-height: 80vh;
        margin: auto;
    }
    h2{
        color: white;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    label{
        margin : 5px;
        font-size: 14px;
        font-weight: 600;
        color: white;
    }
    input{
        margin: 4px;
        border : none;
        border-radius: 3px;
        padding: 10px;
        color: #fff;
        background: #333;
        line-height: 18px;
    }
    .submitButton{
        margin-top: 0.83em;
        background-color: red;
        color: white;
        font-weight: 800;
        font-size: 20px;
    }
    .isUser{
        margin-top: 0.83em;;
        color: gray;
    }
`

const SignInForm = () => {  
    const {setIsLogin} = useContext(IsLogin);
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onValid = async (data) => {
        const response = await Axios.post(`${api.url}/signin`,data, {
            withCredentials : true,
        });
        console.log(response);
        if(response.data === 'Try Again!') alert('없는 계정입니다.')
        else{
            console.log("Login Success !!");
            setIsLogin(true);
            localStorage.setItem('loging-token', response.data.token);
            navigate("/");
        }
    };

    const onInvalid = (data) => console.log(data, "onInvalid");
    return (
        <>
            <Background />
            <NewStyle>
                <h2>로그인</h2>
                <form onSubmit={handleSubmit(onValid, onInvalid)}>
                    <label>E-mail</label>
                    <input name="email" 
                        {...register("email", { required: "email error", pattern: /^[\w.]+@[\w.]+\.[A-Za-z]{2,3}$/i })} 
                        placeholder="E-mail"
                        type="text"
                    />
                    <label>Password</label>
                    <input name="password" 
                        type="password" {...register("password", {required: "password error", minLength: {
                            value:8, message: "too short"
                        }})} 
                        placeholder="Password"
                    />
                    <input type="submit" className="submitButton" value="로그인" />
                </form>
                <div className="isUser">
                    회원이 아니신가요?  
                    <Link to={{pathname: "/signup"}}>회원 가입 </Link>
                </div>
            </NewStyle>
        </>
    )
}

export default SignInForm;