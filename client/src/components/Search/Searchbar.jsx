import React, { useState } from 'react';
import SearchResults from './SearchResults';
import {Input} from 'semantic-ui-react'
import {useDetectClickOutside} from 'react-detect-click-outside'

const Searchbar = () => {

  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const ref= useDetectClickOutside({onTriggered: toggleSearchOff})

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  function toggleSearchOn(){
    setShowSearch(true)
  }

  function toggleSearchOff(){
    setShowSearch(false)
  }
  
  return (
    <div ref={ref}>
      <Input
      icon='search'
      id='simple-search'
      type='text'
      placeholder="Search..."
      value={search}
      onChange={handleSearch}
      onMouseDown={toggleSearchOn}
      />
      { showSearch && <SearchResults search={search}/>}
    </div>
  );
};

export default Searchbar;