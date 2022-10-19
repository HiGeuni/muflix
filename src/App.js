import './App.css';
import React, {useRef, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './layouts/Header';
import MusicList from './components/MusicList';
import Playlist from './components/Playlist';
import NewPlayListForm from './components/NewPlaylist';
import Padding from './layouts/Padding';
import NewMusicForm from './components/NewMusic';
import PlaylistDetail from './components/PlaylistDetail';
import SignInForm from './components/Signin';
import Profile from './components/Profile';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Logout from './components/Logout';

// isLogin은 상태 관리하기

export const UserLoggedIn = React.createContext(false);

function App() {

  const [isLoggedIn, setLoginState] = useState(false);

  return (
    <UserLoggedIn.Provider value = {{isLoggedIn, setLoginState}} >
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
        <Route path="logout" element={<Logout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </UserLoggedIn.Provider>
  );
}

export default App;
