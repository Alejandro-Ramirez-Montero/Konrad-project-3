import React, { useRef } from 'react';

import './App.scss'
import { Route, Routes } from 'react-router-dom';

import Home from './views/home/home';
import ProductDetails from './views/product-details/product-details';
import ProductsList from './views/products-list/products-list';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Cart from './views/cart/cart';

function App() {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({
        behavior: 'smooth', // Habilita el desplazamiento suave
      });
    }
  };

  return (
      <div className='body'>
        <Header scrollToFooter={scrollToFooter}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product-details/:productPath" element={<ProductDetails/>}/>
          <Route path="/products-list" element={<ProductsList/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
        <Footer footerRef={footerRef}/>
      </div>
  )
}

export default App
