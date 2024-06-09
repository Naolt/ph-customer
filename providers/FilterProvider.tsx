import React, { useState } from "react";

export const FilterContext = React.createContext({
  filter: {
    searchTerm: "",
    category: [],
    brand: [],
    price: "",
    pharmacy: [],
  },
  setFilter: (val) => {},
});

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    searchTerm: "",
    category: [],
    brand: [],
    price: "",
    pharmacy: [],
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
