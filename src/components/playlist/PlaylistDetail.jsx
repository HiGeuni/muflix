import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import { api } from 'config/api';
import React, { useState, useEffect, useContext } from 'react';
import { IsLogin } from 'App';
import { musicState } from 'atoms/music';
import { playlistState } from 'atoms/playlist';
import { useRecoilState } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

const UnMarkedli = styled.li`
  margin: 1rem;
  padding: 1rem;
  list-style: none;
  border: 1px gray solid;
  border-radius: 4px;
`;

const PlaylistControl = styled.div`
  display: flex;
  align-items: center;
  h1 {
    margin: 1rem;
  }
  .play-btn {
    border: 2px solid;
    background: none;
    margin: 0.3rem;
    border-radius: 4px;
    padding: 3px;
    font-size: 16px;
  }
`;
const CustomLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  background-color: #0c0c0c;
  color: #ffffff;
  border: 2px solid;
  margin: 0.3rem;
  border-radius: 4px;
  padding: 3px;
  text-decoration: none;
`;

function PlaylistDetail() {
  const params = useParams();
  const { isLogin } = useContext(IsLogin);
  const [playlistData, setData] = useState();
  const [musicData, setMusics] = useState([]);
  const [isUserHasPlaylist, setUserHasPlaylist] = useState(false);
  const [curMusicState, setMusicState] = useRecoilState(musicState);
  const [curPlaylistState, setPlaylistState] = useRecoilState(playlistState);

  const onClickCurrentPlaylist = (name) => {
    toast(`${name} playlist를 재생합니다.`);
    setMusicState((prev) => ({
      ...prev,
      playlist: musicData,
      newPlaylist: !prev.newPlaylist,
    }));
  };

  const fetchData = () => {
    Axios.get(`${api.url}/musics/getPlaylist/${params.index}`).then((d) => {
      setData(d.data.playlist_info);
      setMusics([]);
      for (const i of d.data.musics) {
        Axios.get(`${api.url}/musics/getMusic/${i.music_id}`).then((res) => {
          const res2 = res.data;
          setMusics((prev) => [...prev, ...res2]);
        });
      }
    });
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('loging-token');
    await Axios.get(`${api.url}/users/profile`, {
      headers: {
        Authorization: token,
        withCredentials: true,
        'Content-Type': 'application/json',
      },
    }).then((user) => {
      let flag = false;
      for (const playlist of user.data[1].playlist) {
        if (playlist.id == params.index) {
          flag = true;
        }
      }
      setUserHasPlaylist(flag);
    });
  };

  const onClickDelete = () => {
    const token = localStorage.getItem('loging-token');
    Axios.delete(`${api.url}/musics/delPlaylist/${params.index}`, {
      headers: {
        Authorization: token,
        withCredentials: true,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast('PlayList Deleted!!');
        setPlaylistState(() => ({ isChange: !curPlaylistState.isChange }));
      }
    });
  };

  useEffect(() => {
    fetchData();
    if (isLogin) {
      fetchUser();
    }
  }, []);

  return (
    <Wrapper>
      <PlaylistControl>
        <h1>{playlistData ? playlistData.name : ''}</h1>
        <button
          className="play-btn"
          onClick={() => {
            onClickCurrentPlaylist(playlistData.name);
          }}
        >
          ▶️ 플레이리스트 재생
        </button>
        {isUserHasPlaylist ? (
          <>
            <CustomLink to={{ pathname: `/editPlaylist/${params.index}` }}>
              수정
            </CustomLink>
            <CustomLink to={{ pathname: '/' }} onClick={onClickDelete}>
              삭제
            </CustomLink>
          </>
        ) : (
          ''
        )}
      </PlaylistControl>
      <ToastContainer />
      {musicData?.map((data) => (
        <UnMarkedli key={data.id}>
          {data.name} -{data.singer}
        </UnMarkedli>
      ))}
    </Wrapper>
  );
}

export default PlaylistDetail;
