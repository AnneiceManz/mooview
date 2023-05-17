import React, { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { Button, Input, Search } from "semantic-ui-react";

const Searchbar = ({onSearch}) => {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const searchMovies = async () => {
    if (query) {
      try {
        const response = await fetch("/api/search/" + query);
        const data = await response.json();
        onSearch(data.results);
        setSearched(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // useEffect(() => {
  //   searchMovies();
  // }, [query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  }

  const handleSearchButtonClicked = () => {
    searchMovies();
  }


  return (
    <>
    
    <Input
    icon='search'
      placeholder="Search..."
      value={query}
      onChange={handleSearchChange}
      onKeyPress={handleKeyPress}
    />
    <Button onClick={handleSearchButtonClicked}>Search</Button>
    {searched && <SearchResults query={query} />}
    </>
  );
};

export default Searchbar;
