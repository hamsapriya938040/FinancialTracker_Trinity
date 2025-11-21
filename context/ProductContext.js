import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    { id: "1", BankName: "SBI",Branch:"Kalangiri", CurrentBalance: 100000, transactions: [] },
    { id: "2", BankName: "Canara",Branch:"Siddhartha nagara", CurrentBalance: 50000, transactions: [] },
  ]);

const addProduct = (product) => {
  setProducts([...products, { ...product, transactions: [] }]);
};


  const updateProduct = (updated) => {
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
  };
const deleteProduct = (id) => {
  setProducts(products.filter((p) => p.id !== id));
};

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}