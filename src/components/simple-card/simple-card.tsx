import './styles.scss';

interface SimpleCardProps {
    title: string;
    classes: string;
    buttonAction: () => void;
}

//ARREGLAR onCLick

const SimpleCard:React.FC<SimpleCardProps> = ({title, classes, buttonAction}) => {
    return(
        <button className={'simple-card ' + classes} onClick={buttonAction}>
            <p className="simple-card__label">{title}</p>
        </button>
    );
}

 export default SimpleCard;