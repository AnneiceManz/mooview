import React, { useEffect, useState } from "react";

import { Input, Search } from "semantic-ui-react";

const Searchbar = ({onSearch}) => {
  const [query, setQuery] = useState("");

  const searchMovies = async () => {
    if (query) {
      try {
        const response = await fetch("/api/search/" + query);
        const data = await response.json();
        onSearch(data.results);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    searchMovies();
  }, [query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  }


  return (
    <Input
    icon='search'
      placeholder="Search..."
      value={query}
      onChange={handleSearchChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default Searchbar;
