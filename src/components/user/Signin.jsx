// react-hook-form을 이용해서 form을 만들기
import {useForm} from "react-hook-form";
import NewStyle from "styles/FormStyle";
import Axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserId } from "App";
import { api } from "config/api";

const SignInForm = () => {  
    const {setUserId} = useContext(UserId);
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onValid = async (data) => {
        const response = await Axios.post(`${api.url}/users/signin`,data, {
            withCredentials : true,
        });
        console.log(response);
        if(response.data === 'Try Again!') alert('없는 계정입니다.')
        else{
            console.log("Login Success !!");
            setUserId(true);
            localStorage.setItem('loging-token', response.data.token);
            navigate("/");
        }
    };

    const onInvalid = (data) => console.log(data, "onInvalid");
    return (
        <>
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
                    <input type="submit" className="submitButton" value="등록" />
                </form>
            </NewStyle>
        </>
    )
}

export default SignInForm;