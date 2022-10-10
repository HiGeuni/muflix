import './App.css';
import {Route, Routes} from 'react-router-dom';
import Header from './layouts/Header';
import MusicList from './components/MusicList';
import Playlist from './components/Playlist';
import NewPlayListForm from './components/NewPlaylist';
import Padding from './layouts/Padding';
import NewMusicForm from './components/NewMusic';
import PlaylistDetail from './components/PlaylistDetail';

function App() {
  return (
    <>
      <Header isLogin={true} />
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
      {/* <MusicList /> */}
      {/* <Playlist /> */}
      {/* <NewPlaylist /> */}
      {/* <NewMusicForm /> */}
      
      {/* <PlaylistDetail playlistId={2} /> */}
    </>
  );
}

export default App;
