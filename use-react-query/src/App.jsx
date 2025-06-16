import React, { useState } from "react";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 flex items-start justify-center py-10 px-2">
      <div className="w-full max-w-7xl flex gap-8">
        {/* Add Product - 20% */}
        <div className="basis-[20%] bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col justify-start">
          <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
            Add Product
          </h2>
          <AddProduct />
        </div>
        {/* Product List - 60% */}
        <div className="basis-[60%] bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">
            Product List
          </h2>
          <ProductList onSelect={setSelectedId} />
        </div>
        {/* Product Details - 20% */}
        <div className="basis-[20%] bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col">
          <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
            Product Details
          </h2>
          {selectedId ? (
            <ProductDetails id={selectedId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-lg">Select a product to see details</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
