// react-hook-form을 이용해서 form을 만들기
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
                    <input name="name" {...register("name")} />
                    <label>Singer</label>
                    <input name="Singer" {...register("Singer")} />
                    <label>Playlist information</label>
                    <input name="information" {...register("information")} />
                    <label>Album Cover</label>
                    <input name="cover" {...register("cover")} />
                    <input type="submit" className="submitButton" value="등록" />
                </form>
            </NewStyle>
        </>
    )
}

export default NewMusicForm;