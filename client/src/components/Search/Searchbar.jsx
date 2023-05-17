import React, { useState } from "react";

import { Search } from "semantic-ui-react";

const Searchbar = () => {
  const [query, setQuery] = useState("");

  const handleSearchChange=(e, {value}) => {
    setQuery(value);
  }


  return (
    <Search
      placeholder="Search..."
      value={query}
      onSearchChange={handleSearchChange}
    />
  );
};

export default Searchbar;
