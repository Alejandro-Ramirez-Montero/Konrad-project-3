import { FaFacebookSquare, FaInstagramSquare} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import './styles.scss';

const Footer:React.FC<{}> = ({}) => {
    return(
        <div className="footer" id="footer">
            <div className="footer__year-container" id="year-small-screen">
                <p>2024</p>
            </div>
            <div className="footer__socials-container">
                <a href="https://www.facebook.com/?locale=es_LA" aria-label="Facebook">
                    <FaFacebookSquare color="white" size={30}/>
                </a>
                <a href="https://www.instagram.com/" aria-label="Instagram">
                    <FaInstagramSquare color="white" size={30}/>
                </a>
                <a href="https://twitter.com/" aria-label="YouTube">
                    <FaSquareXTwitter color="white" size={30}/>
                </a>
            </div>
            <div className="footer__footer-info">
                <p> All Rights Reserved.</p>
                <p>Alejandro Ramirez M. & Konrad.</p>
            </div>
            <div className="footer__year-container" id="year-big-screen">
                <p>2024</p>
            </div>
        </div>
    );
}

 export default Footer;