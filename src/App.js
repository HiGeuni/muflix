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
import Profile from './components/Profile'

// isLogin은 상태 관리하기
function App() {
  return (
    <>
      <Header isLogin={false} />
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
      </Routes>
    </>
  );
}

export default App;
