import { useState } from "react";
import { useDispatch } from "react-redux";
import {setSearch} from "../slices/RecipesSlice.tsx";


const Search = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(setSearch(query));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Пошук..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>🔍</button>
        </div>
    );
};

export default Search;
