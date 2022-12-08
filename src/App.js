import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from 'layouts/Header';

import Signin from 'components/user/Signin';
import Signup from 'components/user/Signup';
import Logout from 'components/user/Logout';
import Profile from 'components/user/Profile';

import MusicList from 'components/music/MusicList';
import MusicDetail from 'components/music/MusicDetail';
import NewMusicForm from "components/music/NewMusic";

import Playlist from 'components/playlist/Playlist';
import PlaylistDetail from 'components/playlist/PlaylistDetail.js'
import NewPlayListForm from 'components/playlist/NewPlaylist'

import Padding from 'layouts/Padding';
import Axios from 'axios';
import { api } from './config/api';
import Title from 'components/Title';

// isLogin은 상태 관리하기
export const UserId = React.createContext(false);

const App = () => {
  const [userId, setUserId] = useState(null);
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
            setUserId(null);
        }
        else{
            setUserId(response.data[0].user_id);
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
    <UserId.Provider value = {{userId, setUserId}} >
      <Header />
      <Padding />
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
        <Route path="/newMusic" element={<NewMusicForm />} />
        <Route path="/newPlaylist" element={<NewPlayListForm />} />
        <Route path="/editPlaylist/:index" element={<NewPlayListForm />} />
        <Route
          path='/playlistDetail/:index'
          element = {<PlaylistDetail />}
        />
        <Route
          path="/musicDetail/:index"
          element = {<MusicDetail />}
        />
        <Route path="logout" element={<Logout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </UserId.Provider>
  );
}

export default App;