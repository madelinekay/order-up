import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

import data from "./data";

const SearchContext = createContext({
  searchQuery: "",
  filteredMenu: [],
  search: (e) => {},
});

const flattenedData = Object.values(data).reduce(
  (acc, nested) => [...acc, ...nested],
  []
);

export const SearchContextProvider = (props) => {
  //   const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenu, setFilteredMenu] = useState([]);
  const router = useRouter();

  //   const { search } = window.location;
  //   const searchQuery = new URLSearchParams(search).get("q");
  const searchQuery = router.query.q || "";

  const performSearch = (e) => {
    const value = e.target.value;
    console.log("search value", value);
    // setSearchQuery(value);
    router.push("/?q=" + value);
  };

  useEffect(() => {
    const searchResults = flattenedData.reduce((acc, item) => {
      if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        acc.push(item);
      }
      return acc;
    }, []);
    console.log("search results", searchResults);
    setFilteredMenu(searchResults);
  }, [searchQuery]);

  console.log("search query", searchQuery);

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
