import React, {useState } from "react";
import { FaBars } from "react-icons/fa6";
import './styles.scss';

//AGREGAR EL REDIRECCIONAMIENTO DEL MENU

const Header:React.FC<{}> = ({}) => {
    const [oppenedMenu, setOppenedMenu] = useState<boolean>(false);

    const handleMenu = () => {
        setOppenedMenu(!oppenedMenu);
    }

    return(
        <div className="header">
            <img className="header__logo" src="/logo/logo.png" alt="CampGear logo"></img>
            <button className="header__menu-button" aria-label="Menu" onClick={handleMenu}>
                <FaBars color="white" size={30}/>
            </button>
            <ul className={`header__menu ${oppenedMenu? 'header__menu--visible':'header__menu--invisible'}`}>
                <li><button className="item-button" tabIndex={oppenedMenu? 0: -1} onclick="handleMenuOption('featured-section')">Featured Categories</button></li>
                <li><button className="item-button" tabIndex={oppenedMenu? 0: -1} onclick="handleMenuOption('products-section')">Our Products</button></li>
                <li><button className="item-button" tabIndex={oppenedMenu? 0: -1} onclick="handleMenuOption('footer')">Socials and Legal Disclaimer</button></li>
            </ul>
        </div>
    );
}

 export default Header;