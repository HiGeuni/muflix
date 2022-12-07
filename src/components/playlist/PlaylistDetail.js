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

    const fetchData = async () => {
        await Axios.get(`${api.url}/musics/getPlaylist/${params["index"]}`)
            .then((d) => {
                console.log(d.data.playlist_info);
                console.log(d.data.musics)
                setData(d.data.playlist_info);
                for(let i of d.data.musics){
                    Axios.get(`${api.url}/musics/getMusic/${i.music_id}`)
                    .then((res) => {
                        console.log(res.data[0]);
                        const res2 = res.data;
                        setMusics(prev => {
                            return [...prev, ...res2];
                        });
                    })
                }
            })
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <PlaylistControl>
                <h1>{playlistData? playlistData.name : ""}</h1>
                <CustomLink to={{pathname: `/editPlaylist/${params.index}`}}>수정</CustomLink>
                <CustomLink>삭제</CustomLink>
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