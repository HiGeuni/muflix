import styled from "styled-components";
import data from "../data.json";
import { useParams } from "react-router-dom";

const UnMarkedli = styled.li`
    margin: 1rem;
    padding: 1rem;
    list-style: none;
    border: 1px gray solid;
    border-radius : 4px;
`

const PlaylistControl = styled.div`
    display: flex;
    align-items: center;
    // justify-content: ;
    h1{
        margin: 1rem;
    }
    nav{
        font-size: 18px;
        font-weight: 600;
        background-color: #dbf2f4;
        border: 2px #d2e7e8 solid;
        margin: 0.3rem;
        border-radius : 4px;
    }
`

function PlaylistDetail(){
    const params = useParams();
    // console.log(this.props.match.params.id);
    // playlistId를 기준으로 filtering 후 포함 된 음악들을 보여주기
    // playlistId = 1;
    const PlayListData = data.playlist.filter((dd) => {
        return dd.id === parseInt(params["index"]);
    });

    return (
        <>
            {PlayListData.map((d) => (
                <>
                    <PlaylistControl>
                        <h1>{d.name}</h1>
                        <nav>수정</nav>
                        <nav>삭제</nav>
                    </PlaylistControl>
                    
                    {d.musics.map((data) => (
                        <UnMarkedli key={data.no}>
                            {data.name} - {data.singer}
                        </UnMarkedli>
                    ))}
                </>
            ))}
        </>
    )
}  

export default PlaylistDetail;