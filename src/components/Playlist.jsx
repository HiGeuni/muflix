import playlistData from '../data.json';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import SliderSettings from './SliderSettings';

const AddPlaylist = styled.div`
    display: flex;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    margin: auto;
    background-color:#d2e7e8;
    width: 200px;
    height: 200px;
`

const StyledLink = styled(Link)`
    display: flex;
    margin: auto;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    border: 2px solid;
    width: 200px;
    height: 200px;
`

const UnMarkedli = styled.li`
    display: flex;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    height: 200px;
    padding-bottom: 20px;
`

const CustomDiv = styled.div`
    // display: flex;
    text-align: center;
    justify-content: center;
    h2{
        padding-top: 2rem;
        padding-bottom: 1.5rem;
    }
    padding-bottom: 2rem;
`

function Playlist(){
    // const data = playlistData.playlist.map((s) => {
    //     return s.musics;
    // })
    return (
        <CustomDiv>
            <h2>
                PlayList
            </h2>
            <Slider {...SliderSettings}>
                { playlistData.playlist.map((s) => (
                        <UnMarkedli key = {s.id}>
                            <StyledLink to={{pathname: "/playlistDetail/"+s.id}}>
                                {s.name}
                            </StyledLink>
                        </UnMarkedli>
                ))}
                <Link to="/newPlaylistForm">
                    <AddPlaylist>
                        Add Playlist
                    </AddPlaylist>
                </Link>
            </Slider>
        </CustomDiv>
    )
}

export default Playlist;