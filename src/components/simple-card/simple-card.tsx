import './styles.scss';

interface SimpleCardProps {
    title: string;
    classes: string;
}

//ARREGLAR onCLick

const SimpleCard:React.FC<SimpleCardProps> = ({title, classes}) => {
    return(
        <button className={'simple-card ' + classes} onclick="addDropdownFilter('category', 'Camping Tents')">
            <p className="simple-card__label">{title}</p>
        </button>
    );
}

 export default SimpleCard;