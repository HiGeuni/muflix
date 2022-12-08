import styled from "styled-components";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { api } from "config/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    h1{
        margin: 1rem;
    }
`
const CustomLink = styled(Link)`
    font-size: 15px;
    font-weight: 600;
    background-color: #0c0c0c;
    color: #ffffff;
    border: 2px solid;
    margin: 0.3rem;
    border-radius : 4px;
    padding: 3px;
`

const PlaylistDetail = () => {
    const params = useParams();
    const [playlistData, setData] = useState();
    const [musicData, setMusics] = useState([]);
    const [isUserHasPlaylist, setUserHasPlaylist] = useState(false);

    const fetchData = async () => {
        await Axios.get(`${api.url}/musics/getPlaylist/${params["index"]}`)
            .then((d) => {
                setData(d.data.playlist_info);
                for(let i of d.data.musics){
                    Axios.get(`${api.url}/musics/getMusic/${i.music_id}`)
                    .then((res) => {
                        const res2 = res.data;
                        setMusics(prev => {
                            return [...prev, ...res2];
                        });
                    })
                }
            })
    };

    const fetchUser = async () => {
        const token = localStorage.getItem('loging-token');
        await Axios.get(`${api.url}/users/profile`, {
            headers:{
                "Authorization": token,
                "withCredentials": true,
                "Content-Type" :'application/json',
            }
        })
        .then((user) => {
            console.log(user.data[1].playlist, params["index"])
            let flag = false;
            for(let playlist of user.data[1].playlist){
                if(playlist.id == params["index"]){
                    flag = true;
                }
            }
            setUserHasPlaylist(flag);
            console.log("flag : ", flag);
        });
        
    }

    const onClickDelete = async () => {
        const token = localStorage.getItem("loging-token");
        await Axios.delete(`${api.url}/musics/delPlaylist/${params["index"]}`, 
            {
                headers: {
                    "Authorization" : token,
                    "withCredentials" : true,
                }
            }
        )
            .then((res) => {
                if(res.status === 200)
                    alert(res.data);
            })
    }

    useEffect(() => {
        fetchData();
        fetchUser();
    }, []);

    return (
        <>
            <PlaylistControl>
                <h1>{playlistData? playlistData.name : ""}</h1>
                {
                    isUserHasPlaylist
                    ? <>
                        <CustomLink to={{pathname: `/editPlaylist/${params.index}`}}>수정</CustomLink>
                        <CustomLink to={{pathname: `/`}} onClick={onClickDelete} >삭제</CustomLink>
                    </>
                    : ""
                }
            </PlaylistControl>
            
            {musicData?.map((data) => (
                <UnMarkedli key={data.no}>
                    {data.name} - {data.singer}
                </UnMarkedli>
            ))}
        </>
    )
}  

export default PlaylistDetail;