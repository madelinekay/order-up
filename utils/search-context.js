
import data from "./data";

import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

const SearchContext = createContext({
  searchQuery: "",
  filteredMenu: [],
  search: (e) => { },
});

export const SearchContextProvider = (props) => {
  const [filteredMenu, setFilteredMenu] = useState([]);
  const router = useRouter();
  const searchQuery = router.query.q || "";

  const performSearch = (e) => {
    const value = e.target.value;
    router.push("/?q=" + encodeURIComponent(value));
  };

  useEffect(() => {
    const searchResults = data.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase())
    });

    setFilteredMenu(searchResults);
  }, [searchQuery]);

  const contextValue = {
    searchQuery,
    filteredMenu,
    search: performSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
