import React, { ReactNode, useEffect, useRef } from 'react';

import './App.scss'
import { Route, Routes, useNavigate } from 'react-router-dom';

import Home from './views/home/home';
import ProductDetails from './views/product-details/product-details';
import ProductsList from './views/products-list/products-list';
import Cart from './views/cart/cart';
import Checkout from './views/checkout/checkout';
import Login from './views/login/login';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import { loggedUserState } from './states/logged-user';
import { useRecoilState } from 'recoil';

interface LoggedUserInterface {
  email: string;
  name: string;
  password: string;
}

const MainLayout: React.FC<{children:ReactNode}> = ({children}) => {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='body'>
      <Header scrollToFooter={scrollToFooter} />
      {children}
      <Footer footerRef={footerRef} />
    </div>
  );
};

const SimpleLayout: React.FC<{children:ReactNode}> = ({ children }) => {
  return <div className='body'>{children}</div>;
};

const ProtectedRoute: React.FC<{user:LoggedUserInterface | undefined, children:ReactNode}> = ({user, children}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!user){
      navigate('/login', {replace: true});
    }
  },[]);

    return <div >{children}</div>;
  
};

function App() {
  const [loggedUser, setLoggedUser] = useRecoilState<LoggedUserInterface | undefined>(loggedUserState);

  // useEffect(() => {
  //   if(localStorage.getItem('user')){
  //     setLoggedUser(JSON.parse(localStorage.getItem('user')!));
  //   }
  // },[]);

  return (
      <div className='body'>
        <Routes>
          <Route path="/" element={<MainLayout><Home/></MainLayout>}/>
          <Route path="/product-details/:productPath" element={<MainLayout><ProductDetails/></MainLayout>}/>
          <Route path="/products-list" element={<MainLayout><ProductsList/></MainLayout>}/>
          <Route path="/cart" element={<ProtectedRoute user={loggedUser}><MainLayout><Cart/></MainLayout></ProtectedRoute>}/>
          <Route path="/checkout" element={<ProtectedRoute user={loggedUser}><MainLayout><Checkout/></MainLayout></ProtectedRoute>}/>
          <Route path="/login" element={<SimpleLayout><Login/></SimpleLayout>}/>
        </Routes>
      </div>
  )
}

export default App
