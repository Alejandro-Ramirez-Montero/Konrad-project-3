import React, { ChangeEvent, useState } from "react";
import './styles.scss';

type SetSearchParamsFunction = (newSearchParam: string) => void;

const SearchBar: React.FC<{setSearchParam: SetSearchParamsFunction}> = ({setSearchParam}) => {
    const [searchInput, setSearchInput] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            setSearchParam(searchInput);
        }
    }

    return(
        <input type="text" name="searchbar" id="searchbar" value={searchInput} onChange={handleInputChange} onKeyDown={handleSearch}/>
    );
}

 export default SearchBar;