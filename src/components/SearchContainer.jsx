import { useState } from 'react';

export const SearchContainer = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Ieskoti blogu..."
        value={searchValue}
        onChange={(event) => handleInputChange(event.target.value)}
      />
    </div>
  );
};
