// react-hook-form을 이용해서 form을 만들기
import {useForm} from "react-hook-form";
import NewStyle from "./Style";

function SignInForm(){
    const {register, handleSubmit} = useForm();
    return (
        <>
            <NewStyle>
                <h2>회원 가입</h2>
                <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
                    <label>ID</label>
                    <input name="id" placeholder="Id" {...register("id")} />
                    <label>nickname</label>
                    <input name="nickname" placeholder="nickname" {...register("nickname")} />
                    <label>password</label>
                    <input name="password1" placeholder="password" {...register("password1")} />
                    <label>password</label>
                    <input name="password2" placeholder="Verify Password" {...register("password2")} />
                    <input type="submit" className="submitButton" value="등록" />
                </form>
            </NewStyle>
        </>
    )
}

export default SignInForm;