import playlistData from '../data.json';
import styled from 'styled-components';
import "./Style.scss";

const AddPlaylist = styled.div`
    display: flex;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    background-color:#d2e7e8;
    // padding: 40px;
    width: 200px;
    height: 200px;
`

const UnMarkedli = styled.li`
    display: flex;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    list-style: none;
    border: 2px solid;
    margin: 1rem;
    width: 200px;
    height: 200px;
`

const PlaylistStyle = styled.div`
    display: fixed;
`

function Playlist(){
    const data = playlistData.playlist.map((s) => {
        return s.musics;
    })
    console.log(data);
    return (
        <>
            <h2>
                PlayList
            </h2>
            <PlaylistStyle>
                { playlistData.playlist.map((s) => (
                    <UnMarkedli key = {s.id}>
                            {s.name} <br />
                            {/* Musics: {s.musics.map((t) => {
                                <li key = {t.no}>
                                    {t.name}
                                </li>
                            })} */}
                    </UnMarkedli>
                ))}
                <AddPlaylist> Add Playlist </AddPlaylist>
            </PlaylistStyle>
        </>
    )
}

export default Playlist;