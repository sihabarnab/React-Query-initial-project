import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrieveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products/${queryKey[1]}`
  );
  return response.data;
};

const ProductDetails = ({ id }) => {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retrieveProduct,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-pulse w-24 h-24 bg-blue-100 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-blue-100 rounded mb-2"></div>
        <div className="h-3 w-48 bg-blue-50 rounded mb-2"></div>
        <div className="h-3 w-24 bg-blue-50 rounded"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message}
      </div>
    );
  if (!product)
    return (
      <div className="text-gray-400 text-center mt-10">
        No product found.
      </div>
    );

  return (
    <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-xl p-1 transition-all duration-300">
      <div className="w-28 h-28 mb-4 rounded-full border-4 border-blue-200 shadow-lg overflow-hidden bg-white flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover w-full h-full"
        />
      </div>
      <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center tracking-tight">
        {product.title || "No Title"}
      </h2>
      <p className="text-gray-600 text-sm mb-4 text-center">
        {product.description || "No description available."}
      </p>
      <div className="flex flex-row items-center justify-center gap-4 mb-2 w-full">
        <span className="whitespace-nowrap bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold text-lg shadow">
          {product.price ? `$ ${product.price}` : ""}
        </span>
        <span className="whitespace-nowrap bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold text-lg flex items-center shadow">
          <svg
            className="w-5 h-5 mr-1 inline"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
          {product.rating || 5}
        </span>
      </div>
    </div>
  );
};

export default ProductDetails;
