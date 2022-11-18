import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './layouts/Header';
import MusicList from './components/MusicList';
import Playlist from './components/Playlist';
import NewPlayListForm from './components/NewPlaylist';
import Padding from './layouts/Padding';
import NewMusicForm from './components/NewMusic';
import PlaylistDetail from './components/PlaylistDetail';
import Profile from './components/Profile';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Logout from './components/Logout';
import MusicDetail from './components/MusicDetail';
import Axios from 'axios';
import { api } from './config/api';

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
            setUserId(response.data.user_id);
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
            <MusicList/>
            <Playlist />
          </>
        } 
        />
        <Route path="/newMusicForm" element={<NewMusicForm />} />
        <Route path="/newPlaylistForm" element={<NewPlayListForm />} />
        <Route
          path='/playlistDetail/:index'
          element = {<PlaylistDetail />}
        />
        <Route
          path="/musicDetail/:index"
          elemant = {<MusicDetail />}
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