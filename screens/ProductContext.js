import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);

  const updateProductsData = (data) => {
    setProductsData(data);
  };

  return (
    <ProductContext.Provider value={{ productsData, updateProductsData }}>
      {children}
    </ProductContext.Provider>
  );
};
