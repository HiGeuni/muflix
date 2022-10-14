import playlistData from '../data.json';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const AddPlaylist = styled(Link)`
    display: flex;
    margin: auto;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    background-color: #d2e7e8;
    border: 2px solid;
    width: 200px;
    height: 200px;
`

const StyledLink = styled(Link)`
    display: block;
    margin: auto;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    border: 2px solid;
    width: 200px;
    height :200px;
`

const UnMarkedli = styled.li`
    display: flex;
    list-style: none;
`

const CustomDiv = styled.div`
    text-align: center;
    justify-content: center;
`

function Playlist(){
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2
    };
    const data = playlistData.playlist.map((s) => {
        return s.musics;
    })
    console.log(data);
    return (
        <CustomDiv>
            <h2>
                PlayList
            </h2>
            <Slider {...settings}>
                { playlistData.playlist.map((s) => (
                        <UnMarkedli key = {s.id}>
                            <StyledLink to={{pathname: "/playlistDetail/"+s.id}}>
                                {s.name}
                            </StyledLink>
                        </UnMarkedli>
                ))}
                <AddPlaylist to="/newPlaylistForm">
                    Add Playlist
                </AddPlaylist>
            </Slider>
        </CustomDiv>
    )
}

export default Playlist;