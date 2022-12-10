import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import SliderSettings from 'config/SliderSettings';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { api } from 'config/api';

const AddPlaylist = styled.div`
  display: flex;
  align-items: center; // for vertical
  justify-content: center; // for horizontal
  margin: auto;
  width: 190px;
  height: 190px;
  background-color: #0c0c0c;
  color: #af2f2c;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  border: #af2f2c 5px solid;
`;

const StyledLink = styled(Link)`
  display: flex;
  margin: auto;
  align-items: center; // for vertical
  justify-content: center; // for horizontal
  border: 2px solid black;
  width: 200px;
  height: 200px;
  text-decoration: none;
  color: black;
`;

const UnMarkedli = styled.li`
  display: flex;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 200px;
  padding-bottom: 20px;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`;

const CustomDiv = styled.div`
  // display: flex;
  text-align: center;
  justify-content: center;
  h2 {
    padding-top: 2rem;
    padding-bottom: 1.5rem;
  }
  margin-left: 10%;
  margin-right: 10%;
`;

function Playlist() {
  const [playlistData, setplaylistData] = useState(null);
  const fetchData = async () => {
    await Axios.get(`${api.url}/musics/getAllPlaylist`).then((data) => {
      setplaylistData(data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <CustomDiv>
      <Slider {...SliderSettings}>
        {playlistData?.map((s) => (
          <UnMarkedli key={s.id}>
            <StyledLink
              to={{
                pathname: `/playlistDetail/${s.id}`,
              }}
            >
              {s.name}
            </StyledLink>
          </UnMarkedli>
        ))}
        <CustomLink to="/newPlaylist">
          <AddPlaylist>Add Playlist</AddPlaylist>
        </CustomLink>
      </Slider>
    </CustomDiv>
  );
}

export default Playlist;
