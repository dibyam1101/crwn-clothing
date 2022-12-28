import { createContext, useState } from "react";
import SHOP_PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext({ products: [] });

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_PRODUCTS);
  const value = {
    products,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};