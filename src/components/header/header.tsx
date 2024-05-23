import React, {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import './styles.scss';
import { useRecoilState, useSetRecoilState} from "recoil";
import { cartNotificationState } from "../../states/cart-notification-state";
import { loggedUserState } from "../../states/logged-user";

interface LoggedUserInterface {
    email: string;
    name: string;
    password: string;
  }

const Header:React.FC<{scrollToFooter: () => void}> = ({scrollToFooter}) => {
    const [cartNotifications, setCartNotifications] = useRecoilState<number>(cartNotificationState);
    const [loggedUser, setLoggedUser] = useRecoilState<LoggedUserInterface | undefined>(loggedUserState);
    const [oppenedMenu, setOppenedMenu] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleMenu = () => {
        setOppenedMenu(!oppenedMenu);
    }

    const navigateTo = (location: string) => {
        handleMenu();
        navigate(location);
    }

    const handleLogout = () => {
        setLoggedUser(undefined);
        localStorage.removeItem('user');
        navigate('/');
    }

    useEffect(() => {
        if(localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')!)){
            setCartNotifications(JSON.parse(localStorage.getItem('cart')!).length);
        }
    }, []);

    return(
        <div className="header">
            <img className="header__logo" src="/logo/logo.png" alt="CampGear logo"></img>
            {loggedUser && <div className="header__welcome-message">Welcome Back {loggedUser.name}</div>}
            <button className="header__button header__button--right" aria-label="Cart" onClick={() => navigate('/cart')}>
                <FaShoppingCart className="header__icon" color="white" size={30}/>
                {cartNotifications !== 0? <div className="header__notification"></div> : <></>}
            </button>
            <button className="header__button" aria-label="Menu" onClick={handleMenu}>
                <FaBars className="header__icon" color="white" size={30}/>
            </button>
            <ul className={`header__menu ${oppenedMenu? 'header__menu--visible':'header__menu--invisible'}`}>
                <li>{loggedUser && <div className="item__welcome-message">Welcome {loggedUser.name}</div>}</li>
                <li><button className="item__button" tabIndex={oppenedMenu? 0: -1} onClick={() => navigateTo('/?id=featured-section')}>Featured Categories</button></li>
                <li><button className="item__button" tabIndex={oppenedMenu? 0: -1} onClick={() => navigateTo('/products-list/?id=products-section')}>Our Products</button></li>
                <li><button className="item__button" tabIndex={oppenedMenu? 0: -1} onClick={() => navigateTo('/wishlist')}>Wishlist</button></li>
                <li><button className="item__button" tabIndex={oppenedMenu? 0: -1} onClick={() => {scrollToFooter(); handleMenu();}}>Socials and Legal Disclaimer</button></li>
                <li><button className={`item__button ${loggedUser? 'item__button--hide' : ''}`} tabIndex={oppenedMenu? 0: -1} onClick={() => navigateTo('/login')}>Log In</button></li>
                <li><button className={`item__button ${loggedUser? '' : 'item__button--hide'}`} tabIndex={oppenedMenu? 0: -1} onClick={() => handleLogout()}>Log Out</button></li>
            </ul>
        </div>
    );
}

 export default Header;