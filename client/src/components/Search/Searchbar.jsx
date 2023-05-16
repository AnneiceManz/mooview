import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search/${query}`);
      const results = await response.json();
      setResults(results);
      console.log("searchbat results:",results);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>

      {results.map(result => (
        <div key={result.id}>
            <h2>{result.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Searchbar;
