import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

import data from "./data";

const SearchContext = createContext({
  searchQuery: "",
  filteredMenu: [],
  search: (e) => {},
});

export const SearchContextProvider = (props) => {
  const [filteredMenu, setFilteredMenu] = useState([]);
  const router = useRouter();

  const searchQuery = router.query.q || "";

  const performSearch = (e) => {
    const value = e.target.value;
    router.push("/?q=" + value);
  };

  useEffect(() => {
    const searchResults = data.reduce((acc, item) => {
      if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        acc.push(item);
      }
      return acc;
    }, []);

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
