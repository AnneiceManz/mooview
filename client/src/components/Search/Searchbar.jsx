import React, { useState } from 'react';
import SearchResults from './SearchResults';
import {Input, Form} from 'semantic-ui-react'
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
    <form  className='relative flex w-1/2 ml-10' ref={ref}>
      <input
      id='simple-search'
      type='text'
      className='bg-neutral-800 border border-neutral-700 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full'
      placeholder="Search..."
      value={search}
      onChange={handleSearch}
      onMouseDown={toggleSearchOn}
      />
      { showSearch && <SearchResults search={search}/>}
    </form>
  );
};

export default Searchbar;