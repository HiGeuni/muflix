import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import { api } from 'config/api';
import { useState, useEffect, useContext } from 'react';
import { IsLogin } from 'App';
import { musicState } from 'atoms/music';
import { useRecoilState } from 'recoil';

const Wrapper = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

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
`;
const CustomLink = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  background-color: #0c0c0c;
  color: #ffffff;
  border: 2px solid;
  margin: 0.3rem;
  border-radius: 4px;
  padding: 3px;
`;

function PlaylistDetail() {
  const params = useParams();
  const { isLogin } = useContext(IsLogin);
  const [playlistData, setData] = useState();
  const [musicData, setMusics] = useState([]);
  const [isUserHasPlaylist, setUserHasPlaylist] = useState(false);
  const [curMusicState, setMusicState] = useRecoilState(musicState);

  const fetchData = async () => {
    await Axios.get(`${api.url}/musics/getPlaylist/${params.index}`).then(
      (d) => {
        setData(d.data.playlist_info);
        setMusics([]);
        for (const i of d.data.musics) {
          Axios.get(`${api.url}/musics/getMusic/${i.music_id}`).then((res) => {
            const res2 = res.data;
            setMusics((prev) => [...prev, ...res2]);
          });
        }
      },
    );
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

  const onClickDelete = async () => {
    const token = localStorage.getItem('loging-token');
    await Axios.delete(`${api.url}/musics/delPlaylist/${params.index}`, {
      headers: {
        Authorization: token,
        withCredentials: true,
      },
    }).then((res) => {
      if (res.status === 200) alert(res.data);
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

      {musicData?.map((data) => (
        <UnMarkedli key={data.id}>
          {data.name} -{data.singer}
        </UnMarkedli>
      ))}
    </Wrapper>
  );
}

export default PlaylistDetail;
