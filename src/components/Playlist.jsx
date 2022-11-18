import playlistData from '../data.json';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import SliderSettings from './SliderSettings';
import Axios from 'axios';

const AddPlaylist = styled.div`
    display: flex;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    margin: auto;
    width: 190px;
    height: 190px;
    background-color:#0c0c0c;
    color: #AF2F2c;
    font-size: 24px;
    font-weight: 700;
    text-decoration: none;
    border: #AF2F2c 5px solid;
`

const StyledLink = styled(Link)`
    display: flex;
    margin: auto;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    border: 2px solid;
    width: 200px;
    height: 200px;
    color : #000000;
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

const CustomLink = styled(Link)`
    text-decoration: none;
    color: #000000
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

const Playlist = () => {
    
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
                <CustomLink to="/newPlaylistForm">
                    <AddPlaylist>
                        Add Playlist
                    </AddPlaylist>
                </CustomLink>
            </Slider>
        </CustomDiv>
    )
}

export default Playlist;