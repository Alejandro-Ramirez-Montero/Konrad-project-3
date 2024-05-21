import React, {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import './styles.scss';
import { useRecoilState, useSetRecoilState} from "recoil";
import { cartNotificationState } from "../../states/cart-notification-state";
import { loggedUserState } from "../../states/logged-user";


const Header:React.FC<{scrollToFooter: () => void}> = ({scrollToFooter}) => {
    const [cartNotifications, setCartNotifications] = useRecoilState<number>(cartNotificationState);
    const [oppenedMenu, setOppenedMenu] = useState<boolean>(false);
    const navigate = useNavigate();

    const setLoggedUser = useSetRecoilState(loggedUserState);

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
            <button onClick={()=> handleLogout()}>Logout</button>
            <button className="header__button header__button--right" aria-label="Cart" onClick={() => navigate('/cart')}>
                <FaShoppingCart className="header__icon" color="white" size={30}/>
                {cartNotifications !== 0? <div className="header__notification"></div> : <></>}
            </button>
            <button className="header__button" aria-label="Menu" onClick={handleMenu}>
                <FaBars className="header__icon" color="white" size={30}/>
            </button>
            <ul className={`header__menu ${oppenedMenu? 'header__menu--visible':'header__menu--invisible'}`}>
                <li><button className="item-button" tabIndex={oppenedMenu? 0: -1} onClick={() => navigateTo('/?id=featured-section')}>Featured Categories</button></li>
                <li><button className="item-button" tabIndex={oppenedMenu? 0: -1} onClick={() => navigateTo('/products-list/?id=products-section')}>Our Products</button></li>
                <li><button className="item-button" tabIndex={oppenedMenu? 0: -1} onClick={() => {scrollToFooter(); handleMenu();}}>Socials and Legal Disclaimer</button></li>
            </ul>
        </div>
    );
}

 export default Header;