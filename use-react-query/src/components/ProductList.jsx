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
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl font-semibold mb-6">Product List</h2>
      <ul className="flex flex-wrap justify-center gap-6">
        {products.data &&
          products.data.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center border rounded-md shadow w-[300px] hover:shadow-lg transition"
            >
              <img
                src={product.thumbnail}
                alt={product.name}
                className="object-cover w-96 h-64 rounded-t-md"
              />
              <div className="p-4 flex flex-col items-center">
                <p className="text-lg font-medium text-center">
                  {product.title}
                </p>
                <button
                  className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => onSelect(product.id)}
                >
                  Details
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex">
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            Prev
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
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
