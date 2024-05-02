import React, { ChangeEvent} from "react";
import './styles.scss';

type SetSearchFunction = (newSearch: string) => void;

const Searchbar: React.FC<{setSearch: SetSearchFunction, search:string}> = ({setSearch, search}) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return(
        <div className="searchbar-container">
            <input className="searchbar" type="text" name="searchbar" id="searchbar" aria-label="product searchbar" placeholder="Search" value={search} onChange={handleInputChange}/>
        </div>
    );
}

 export default Searchbar;