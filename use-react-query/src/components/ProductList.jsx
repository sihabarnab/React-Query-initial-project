import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const retriveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`
  );
  return response.data;
};

const ProductList = ({ onSelect }) => {
  const [page, setPage] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retriveProducts,
    refetchInterval: 1000, // Refetch every 10 seconds
  });

  if (isLoading)
    return <div className="text-center mt-10">Fetching Products...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        An error occurred: {error.message}
      </div>
    );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {products.data &&
          products.data.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-lg border border-blue-100 p-3 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full"
            >
              <div className="w-24 h-24 mb-4 rounded-full border-4 border-blue-200 shadow-lg overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-lg font-extrabold text-indigo-700 mb-1 text-center tracking-tight">
                {product.title || "No Title"}
              </h3>
              <p className="text-gray-500 text-sm mb-3 text-center line-clamp-2">
                {product.description || "No description available."}
              </p>
              <span className="text-blue-600 font-bold mb-3 text-lg">
                {product.price ? `$ ${product.price}` : ""}
              </span>
              <button
                className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow hover:from-blue-600 hover:to-indigo-600 hover:scale-105 transition"
                onClick={() => onSelect(product.id)}
              >
                Details
              </button>
            </div>
          ))}
      </div>
      <div className="flex mt-8 justify-center space-x-4">
        {products.prev && (
          <button
            className="px-4 py-2 bg-white border border-blue-200 rounded-lg shadow hover:bg-blue-100 text-blue-700 font-semibold transition"
            onClick={() => setPage(products.prev)}
          >
            Prev
          </button>
        )}
        {products.next && (
          <button
            className="px-4 py-2 bg-white border border-blue-200 rounded-lg shadow hover:bg-blue-100 text-blue-700 font-semibold transition"
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
