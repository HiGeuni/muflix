// react-hook-form을 이용해서 form을 만들기
import {useForm} from "react-hook-form";
import NewStyle from "./Style";

function SignInForm(){
    const {register, handleSubmit} = useForm();
    return (
        <>
            <NewStyle>
                <h2>로그인</h2>
                <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
                    <label>ID</label>
                    <input name="id" {...register("id")} placeholder="Id"/>
                    <label>password</label>
                    <input name="password" {...register("password")} placeholder="Password"/>
                    <input type="submit" className="submitButton" value="등록" />
                </form>
            </NewStyle>
        </>
    )
}

export default SignInForm;