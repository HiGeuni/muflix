import './App.css';
import Header from './layouts/Header';
import MusicList from './components/MusicList';
import Playlist from './components/Playlist';
import NewPlaylist from './components/NewPlaylist';
import Padding from './layouts/Padding';
import NewMusicForm from './components/NewMusic';
import PlaylistDetail from './components/PlaylistDetail';

function App() {
  return (
    <>
      <Header isLogin={true} />
      <Padding />
      <MusicList />
      <Playlist />
      {/* <NewPlaylist /> */}
      {/* <NewMusicForm /> */}
      
      {/* <PlaylistDetail playlistId={2} /> */}
    </>
  );
}

export default App;
