import playlistData from '../data.json';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

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
    margin : auto;
`

const StyledLink = styled(Link)`
    display: flex;
`


const UnMarkedli = styled.li`
    display: flex;
    align-items: center; // for vertical
    justify-content: center; // for horizontal
    list-style: none;
    border: 2px solid;
    margin: auto;
    width: 200px;
    height: 200px;
`

const CustomDiv = styled.div`
    // display: flex;
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
                    <StyledLink to={{pathname: "/playlistDetail/"+s.id}}>
                        <UnMarkedli key = {s.id}>
                            {s.name} <br />
                            {/* Musics: {s.musics.map((t) => {
                                <li key = {t.no}>
                                    {t.name}
                                </li>
                            })} */}
                        </UnMarkedli>
                    </StyledLink>
                ))}
                <Link to="/newPlaylistForm">
                    <AddPlaylist> Add Playlist </AddPlaylist>
                </Link>
            </Slider>
        </CustomDiv>
    )
}

export default Playlist;