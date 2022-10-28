// react-hook-form을 이용해서 form을 만들기
import {useForm} from "react-hook-form";
import NewStyle from "./Style";
import Axios from 'axios';
import {useNavigate } from 'react-router-dom';

const SignInForm = () => {

    const navigate = useNavigate();

    const onButtonClick = async (data) => {
        if(data["password1"] === data["password2"]){
            const response = await Axios.post('http://localhost:4000/users/signup',data);
            console.log(response);

            navigate("/login")
        }
        else {
            alert("비밀번호를 확인해주세요!");
        }
    }
    const {register, handleSubmit} = useForm();

    return (
        <>
            <NewStyle>
                <h2>회원 가입</h2>
                <form onSubmit={handleSubmit((data) => onButtonClick(data))}>
                    <label>E-mail</label>
                    <input name="email" placeholder="test@google.com" {...register("email")} />
                    <label>nickname</label>
                    <input name="nickname" placeholder="nickname" {...register("nickname")} />
                    <label>전화번호</label>
                    <input name="전화번호" placeholder="010-****-****" {...register("phonenum")} />
                    <label>password</label>
                    <input name="password1" type="password" placeholder="password" {...register("password1")} />
                    <label>password 확인</label>
                    <input name="password2" type="password" placeholder="Verify Password" {...register("password2")} />
                    
                    <input type="submit" className="submitButton" value="등록" />
                </form>
            </NewStyle>
        </>
    )
}

export default SignInForm;