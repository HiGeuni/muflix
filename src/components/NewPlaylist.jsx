// react-hook-form을 이용해서 form을 만들기
import {useForm} from "react-hook-form";
import NewStyle from "./Style";

function NewPlayListForm(){
    const {register, handleSubmit} = useForm();
    return (
        <>
            <NewStyle>
                <h2>New Playlist</h2>
                <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
                    <label>Playlist name</label>
                    <input name="name" placeholder="Playlist Name" {...register("name")} />
                    <label>Playlist information</label>
                    <input name="information" placeholder="Playlist Information" {...register("information")} />
                    <label>Musics</label>
                    <input name="musics" {...register("musics")} />
                    <input type="submit" className="submitButton" value="등록" />
                </form>
            </NewStyle>
        </>
    )
}

export default NewPlayListForm;