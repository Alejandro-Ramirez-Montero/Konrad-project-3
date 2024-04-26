import './playlist.scss'
import SideBar from '../../components/side-bar/side-bar';
import { Link } from 'react-router-dom';


function Playlist() {
  return (
      <div className="main-container">
        <Link to="/">Home</Link>
        <SideBar></SideBar>
      </div>
  )
}

export default Playlist
