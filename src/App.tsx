import { useState } from 'react'
import './App.scss'
import SideBar from './components/side-bar/side-bar';
import Modal from './components/modal/modal';
import { Route, Routes } from 'react-router-dom';

import Playlist from './views/playlist/playlist';
import Home from './views/home/home';
import ProductDetails from './views/product-details/product-details';

import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  const [searchParam, setSearchParam] = useState<string>('');
  //const [modalOpen, setModalOpen] = useState<boolean>(false);

  //<SideBar setModalOpen={setModalOpen(true)}></SideBar>
  //<Modal modalOpen={modalOpen}></Modal>

  //{<Route path="/" element={<Home />} />}
  //<Route path="playlist" element={<Playlist />} />
  return (
      <div className='body'>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product-details/:productName" element={<ProductDetails/>}/>
        </Routes>
        <Footer/>
      </div>
  )
}

export default App
