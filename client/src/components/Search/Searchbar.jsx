import React, { useState } from "react";

import { Search } from "semantic-ui-react";

const Searchbar = () => {
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <Search
      placeholder="Search..."
      value={search}
      onSearchChange={handleSearch}
    />
  );
};

export default Searchbar;
