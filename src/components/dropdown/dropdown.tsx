import { useEffect, useState } from 'react';
import './styles.scss';

interface DropdownProps {
    title: string;
    field: string;
    disabled: boolean;
    addFilter: (field: string, option: string) => void;
    options: Array<string>;
    defaultOption?: string;
    firstOption?: string;
    clearFilter: boolean;

}

const Dropdown:React.FC<DropdownProps> = ({title, field, disabled, addFilter, options, defaultOption, firstOption, clearFilter}) => {
    const [showDropdown, setShowDropdown] = useState<boolean>();
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const [activeOption, setActiveOption] = useState<string>(firstOption? firstOption : (defaultOption? defaultOption : 'Select'));

    const handleOption = (option:string) => {
        setShowDropdown(false);
        setActiveOption(option);
        addFilter(field, option);
    }

    useEffect(() => {
        if(firstRender){
            setFirstRender(false);
        }
        else{
            setActiveOption(defaultOption? defaultOption : 'Select');
        }
    }, [clearFilter]);

    return(
    <div className="dropdown">
        <h3 className="dropdown__name">{title}</h3>
        <button className="dropdown__button" disabled={disabled} onClick={() => setShowDropdown(!showDropdown)}>{activeOption}</button>
        <ul className={`dropdown__list ${showDropdown? 'dropdown__list--show' : 'dropdown__list--hide'}`}>
            {options.map((option) =>
                <li key={`${option}`} className="dropdown__list-item"><button className="dropdown__list-item-button" onClick={() => handleOption(option)}>{option}</button></li>
            )}
        </ul>
    </div>
    );
}

 export default Dropdown;