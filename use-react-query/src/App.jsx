import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList onSelect={setSelectedId} />
      {selectedId && <ProductDetails id={selectedId} />}
    </div>
  );
};

export default App;
