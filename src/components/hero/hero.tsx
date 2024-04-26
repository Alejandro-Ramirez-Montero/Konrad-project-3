import './styles.scss';

const Hero:React.FC<{}> = ({}) => {
    return(
        <div className='hero-container'>
            <div className="hero">
                <h1 className="hero__title">CampGear</h1>
                <p className="hero__description">Prepare yourself for the next adventure</p>
            </div>
        </div>
    );
}

 export default Hero;