import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import SliderSettings from 'config/SliderSettings';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { api } from 'config/api';
import { playlistState } from 'atoms/playlist';
import { useRecoilState } from 'recoil';

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
  width: 200px;
  height: 250px;
  text-decoration: none;
  color: black;
  img {
    margin: auto;
    border: 1px solid;
    border-radius: 50%;
    width: 200px;
    height: 200px;
  }
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
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

function Playlist() {
  const [playlistData, setplaylistData] = useState([]);
  const [curPlaylistState, setPlaylistState] = useRecoilState(playlistState);

  // const [primaryMusic, setPrimaryMusic] = useState({});
  const fetchData = async () => {
    await Axios.get(`${api.url}/musics/getAllPlaylist`).then((data) => {
      setplaylistData(data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [curPlaylistState.isChange]);

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
              <div>
                <img src={s.representive_image}></img>
                {s.name}
              </div>
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
