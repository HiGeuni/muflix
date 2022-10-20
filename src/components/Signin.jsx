// react-hook-form을 이용해서 form을 만들기
import {useForm} from "react-hook-form";
import NewStyle from "./Style";
import Axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { SessionId } from "../App";

const SignInForm = () => {  
    const {setSessionId} = useContext(SessionId);
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onValid = async (data) => {
        const response = await Axios.post('http://localhost:4000/users/signin',data);
        console.log(response);
        if(response.data === 'Try Again!') alert('없는 계정입니다.')
        else{
            console.log("Login Success !!");
            console.log(response.data.sessionId);
            setSessionId(response.data.sessionId);
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