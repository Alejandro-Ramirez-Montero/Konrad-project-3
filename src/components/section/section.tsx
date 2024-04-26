import './styles.scss';

interface SectionProps {
    title: string;
    classes: string;
    children?: React.ReactNode;

}
//'section section--brown section--first section--vh'
const Section:React.FC<SectionProps> = ({title, classes, children}) => {
    return(
    <section className={'section ' + classes}>
        <h2 className='section__title' id='featured-section'>{title}</h2>
        {children}
    </section>
    );
}

 export default Section;