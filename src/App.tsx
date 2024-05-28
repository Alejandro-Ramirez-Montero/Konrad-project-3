import React, { ReactNode, useEffect, useRef, useState } from 'react';

import './App.scss'
import { Route, Routes, useNavigate } from 'react-router-dom';

import Home from './views/home/home';
import ProductDetails from './views/product-details/product-details';
import ProductsList from './views/products-list/products-list';
import Cart from './views/cart/cart';
import Checkout from './views/checkout/checkout';
import Login from './views/login/login';
import SignUp from './views/sign-up/sign-up';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import { loggedUserState } from './states/logged-user';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Wishlist from './views/wishlist/wishlist';
import { userTokenState } from './states/user-token';
import { requestCart, requestUserData } from './utils/functions';
import AdminPanel from './views/admin-panel/admin-panel';
import OrderHistory from './views/order-history/order-history';
import { cartNotificationState } from './states/cart-notification-state';

interface LoggedUserInterface {
  email: string;
  fullName: string;
  role: string;
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

const AuthorizedRoute: React.FC<{user:LoggedUserInterface | undefined, children:ReactNode}> = ({user, children}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(user?.role != 'ADMIN' && user?.role != 'SUPER_ADMIN'){
      navigate('/', {replace: true});
    }
  },[]);

    return <div >{children}</div>;
  
};

function App() {
  const [loggedUser, setLoggedUser] = useRecoilState<LoggedUserInterface | undefined>(loggedUserState);
  const [userToken, setUserToken] = useRecoilState<string | undefined>(userTokenState);
  const setCartNotifications = useSetRecoilState<boolean>(cartNotificationState);
  const [doneLoading, setDoneLoading] = useState<boolean>(false);

  useEffect(() => {
    if(userToken){
      requestUserData(userToken)
      .then(data =>  {
        setLoggedUser({
          email: data.email,
          fullName: data.fullName,
          role: data.role.name,
        })
      })
      .catch(error => {
        setUserToken(undefined);
        setLoggedUser(undefined);
        setDoneLoading(true);
      });

      requestCart(userToken)
      .then(response => {
        if(response && response > 0){
          setCartNotifications(true);
        }
        else{
          setCartNotifications(false);
        }
      })
      .catch();
    }
    else{
      setDoneLoading(true);
      setCartNotifications(false);
    }
  },[userToken]);

  useEffect(() =>{
    if(loggedUser){
      setDoneLoading(true);
    }
  },[loggedUser]);

  return (
      <div className='body'>
        { doneLoading &&
        <Routes>
          <Route path="/" element={<MainLayout><Home/></MainLayout>}/>
          <Route path="/product-details/:productPath" element={<MainLayout><ProductDetails/></MainLayout>}/>
          <Route path="/products-list" element={<MainLayout><ProductsList/></MainLayout>}/>
          <Route path="/wishlist" element={<ProtectedRoute user={loggedUser}><MainLayout><Wishlist/></MainLayout></ProtectedRoute>}/>
          <Route path="/cart" element={<ProtectedRoute user={loggedUser}><MainLayout><Cart/></MainLayout></ProtectedRoute>}/>
          <Route path="/checkout" element={<ProtectedRoute user={loggedUser}><MainLayout><Checkout/></MainLayout></ProtectedRoute>}/>
          <Route path="/order-history" element={<ProtectedRoute user={loggedUser}><MainLayout><OrderHistory/></MainLayout></ProtectedRoute>}/>
          <Route path="/admin-panel" element={<ProtectedRoute user={loggedUser}><AuthorizedRoute user={loggedUser}><MainLayout><AdminPanel/></MainLayout></AuthorizedRoute></ProtectedRoute>}/>
          <Route path="/login" element={<SimpleLayout><Login/></SimpleLayout>}/>
          <Route path="/sign-up" element={<SimpleLayout><SignUp/></SimpleLayout>}/>
        </Routes>
        }
      </div>
  )
}

export default App
