import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

const SearchContext = createContext({
  searchQuery: "",
  filteredMenu: [],
  search: (e) => {},
});

export const SearchContextProvider = (props) => {
  const [searchQuery, setSearchQuery] = useState();
  const [filteredMenu, setFilteredMenu] = useState([]);
  const router = useRouter();

  const search = (e) => {
    (e) => setSearchQuery(e.target.value);
    // router.push("/search/s=" + searchQuery);
  };

  console.log("search query", searchQuery);

  const contextValue = {
    searchQuery,
    filteredMenu,
    search,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
