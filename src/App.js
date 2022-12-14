import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Axios from 'axios';
import { useRecoilState } from 'recoil';
import { musicState } from 'atoms/music';

import Header from 'layouts/Header';
import Background from 'layouts/Background';
import TopSizedBox from 'layouts/TopSizedBox';

import Signin from 'components/user/Signin';
import Signup from 'components/user/Signup';
import Logout from 'components/user/Logout';
import Profile from 'components/user/Profile';

import MusicList from 'components/music/MusicList';
import MusicDetail from 'components/music/MusicDetail';
import NewMusicForm from 'components/music/NewMusic';

import CommentList from 'components/comment/CommentList';

import Playlist from 'components/playlist/Playlist';
import PlaylistDetail from 'components/playlist/PlaylistDetail';
import NewPlayListForm from 'components/playlist/NewPlaylist';

import Title from 'components/Title';
import { api } from './config/api';
import AudioPlayer from 'components/playingMenu/AudioPlayer';
import UserPlaylist from 'components/playlist/UserPlaylist';

// isLogin은 상태 관리하기
export const IsLogin = React.createContext(false);

function App() {
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [curMusicState, setMusicState] = useRecoilState(musicState);

  const fetchUsers = async () => {
    const token = localStorage.getItem('loging-token');
    // token is validate?
    await Axios.get(`${api.url}/users/profile`, {
      headers: {
        Authorization: token,
        withCredentials: true,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const user = res.data[0]["이름"];
        if (res.status === 401) {
          setIsLogin(false);
        } else {
          setIsLogin(true);
          setUsername(user);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <IsLogin.Provider value={{ isLogin, setIsLogin }}>
      <Header />
      <TopSizedBox />
      {/* <Background /> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Title name="Music List" />
              <MusicList />
              {isLogin && 
                <>
                  <Title name={`${username}님의 Playlist`}/>
                  <UserPlaylist />
                </>
              }
              <Title name="Browse Playlist" />
              <Playlist />
            </>
          }
        />
        <Route
          path="/newMusic"
          element={
            <>
              <Background />
              <NewMusicForm />
            </>
          }
        />
        <Route
          path="/newPlaylist"
          element={
            <>
              <Background />
              <NewPlayListForm />
            </>
          }
        />
        <Route path="/editPlaylist/:index" element={<NewPlayListForm />} />
        <Route path="/playlistDetail/:index" element={<PlaylistDetail />} />
        <Route
          path="/musicDetail/:index"
          element={
            <>
              <MusicDetail />
              <CommentList />
            </>
          }
        />
        <Route path="logout" element={<Logout />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="login"
          element={
            <>
              <Background />
              <Signin />
            </>
          }
        />
        <Route
          path="signup"
          element={
            <>
              <Background />
              <Signup />
            </>
          }
        />
        {/* 만약 음악이 실행이 된다면, 여기에 추가하기 */}
      </Routes>
      {curMusicState.playlist.length ? (
        <>
          <AudioPlayer />
        </>
      ) : (
        ''
      )}
    </IsLogin.Provider>
  );
}

export default App;
