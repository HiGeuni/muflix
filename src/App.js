import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from 'layouts/Header';
import Background from 'layouts/Background';
import { useRecoilState } from 'recoil';
import { musicState } from 'atoms/music';
// import {
//   RecoilRoot,
//   atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
// } from 'recoil';

import Signin from 'components/user/Signin';
import Signup from 'components/user/Signup';
import Logout from 'components/user/Logout';
import Profile from 'components/user/Profile';

import MusicList from 'components/music/MusicList';
import MusicDetail from 'components/music/MusicDetail';
import NewMusicForm from "components/music/NewMusic";

import CommentForm from 'components/comment/NewComment';
import CommentList from 'components/comment/CommentList';

import Playlist from 'components/playlist/Playlist';
import PlaylistDetail from 'components/playlist/PlaylistDetail.js'
import NewPlayListForm from 'components/playlist/NewPlaylist'

import TopSizedBox from 'layouts/TopSizedBox';
import Axios from 'axios';
import { api } from './config/api';
import Title from 'components/Title';
import TestComponent from 'components/TestComponent';
import NowPlaying from 'components/playingMenu/NowPlaying';


// isLogin은 상태 관리하기
export const IsLogin = React.createContext(false);

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [curMusicState, setMusicState] = useRecoilState(musicState);

  const fetchUsers = async () => {
    try{
        let token = localStorage.getItem('loging-token');
        const response = await Axios.get(`${api.url}/users/profile`,
        { 
            headers: {
                "Authorization": token,
                "withCredentials": true,
                "Content-Type" :'application/json',
            }
        },
        );
        if(response.data === "No User"){
            setIsLogin(false);
        }
        else{
            setIsLogin(true);
        }
    }
    catch (e){
        console.log(e);
    }
  }

  useEffect(() => {
      console.log("프로필 확인");
      fetchUsers();
  },[]);

  return (
    <IsLogin.Provider value = {{isLogin, setIsLogin}} >
      <Header />
      <TopSizedBox />
      <Routes>
        <Route path="/" element={
          <>
            <Title name="Music List"/>
            <MusicList/>
            <Title name="Playlist" />
            <Playlist />
          </>
        } 
        />
        <Route path="/newMusic" element={
          <>
            <Background />
            <NewMusicForm />
          </>
        } />
        <Route path="/newPlaylist" element={
          <>
            <Background />
            <NewPlayListForm />
          </>
        } />
        <Route path="/editPlaylist/:index" element={<NewPlayListForm />} />
        <Route
          path='/playlistDetail/:index'
          element = {<PlaylistDetail />}
        />
        <Route
          path="/musicDetail/:index"
          element = {
            <>
              <MusicDetail />
              <CommentForm />
              <CommentList />
            </>
          }
        />
        <Route path="logout" element={<Logout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={
          <>
            <Background />
            <Signin />
          </>
        } />
        <Route path="signup" element={
          <>
            <Background />
            <Signup />
          </>
        } />
        {/* 만약 음악이 실행이 된다면, 여기에 추가하기 */}
      </Routes>
      {curMusicState.playlist.length ? <NowPlaying /> :""}
    </IsLogin.Provider>
  );
}

export default App;