import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setState({
        title: "",
        description: "",
        price: 0,
        rating: 5,
        thumbnail: "",
      });
    },
  });

  const submitData = (event) => {
    event.preventDefault();
    const newData = { ...state, id: crypto.randomUUID().toString() };
    mutation.mutate(newData);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="m-4 p-6 bg-white rounded-2xl shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Add a Product</h2>
      {mutation.isSuccess && (
        <div className="mb-2 text-green-600 font-semibold animate-pulse">
          Product Added!
        </div>
      )}
      <form className="flex flex-col gap-3" onSubmit={submitData}>
        <input
          type="text"
          value={state.title}
          name="title"
          onChange={handleChange}
          className="border border-blue-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Product name"
          required
        />
        <textarea
          value={state.description}
          name="description"
          onChange={handleChange}
          className="border border-blue-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Product description"
          required
        />
        <input
          type="number"
          value={state.price}
          name="price"
          onChange={handleChange}
          className="border border-blue-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Product price"
          min={0}
          required
        />
        <input
          type="text"
          value={state.thumbnail}
          name="thumbnail"
          onChange={handleChange}
          className="border border-blue-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Thumbnail URL"
          required
        />
        <button
          type="submit"
          className={`bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 transition ${
            mutation.isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {/* Live preview */}
      <div className="mt-6 bg-gray-50 rounded-xl shadow-inner p-4 flex flex-col items-center">
        <img
          src={
            state.thumbnail ||
            "https://via.placeholder.com/100x100.png?text=Preview"
          }
          alt={state.title || "Preview"}
          className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-blue-200 shadow"
        />
        <h3 className="text-lg font-semibold text-gray-800">
          {state.title || "Product Name"}
        </h3>
        <p className="text-gray-500 text-sm text-center">
          {state.description || "Product description will appear here."}
        </p>
        <span className="text-blue-600 font-bold mt-2">
          {state.price ? `USD ${state.price}` : ""}
        </span>
      </div>
    </div>
  );
};

export default AddProduct;
