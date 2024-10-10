"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleNameChange = (event) => {
    let name = event.target.value;
    name = name.replace(/[^a-zA-Z0-9\s]/g, "");
    setName(name);
  };
  const handleCategoryChange = (event) => {
    let category = event.target.value;
    category = category.replace(/[^a-zA-Z0-9\s]/g, "");
    setCategory(category);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let item = { name, quantity, category };
    console.log(item);
    alert(`Added item: ${name}, Quantity: ${quantity}, Category: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("");
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="p-2 m-4
    bg-slate-300
    text-black
    max-w-sm w-full rounded-md"
    >
      <div className="mb-2">
        <input
          type="text"
          placeholder="Item name"
          className="w-full mt-1 border-gray-300 p-2 rounded-lg font-sans"
          value={name}
          onChange={handleNameChange}
        ></input>
      </div>
      <div className="flex justify-between">
        <div className="p-2 mt-1 mb-1 rounded-md bg-white text-white w-36">
          <div className="flex justify-between">
            <span className="text-gray-900">{quantity}</span>
            <div className="flex">
              <button
                type="button"
                onClick={decrement}
                disabled={quantity == 1}
                className="w-10
            bg-blue-500
            text-white
            font-bold
            rounded-lg
            shadow-md
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
            disabled:bg-gray-500"
              >
                -
              </button>
              <button
                type="button"
                onClick={increment}
                disabled={quantity == 20}
                className="w-10
            bg-blue-500
            text-white
            font-bold
            rounded-lg
            shadow-md
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
            disabled:bg-gray-500
            ml-1"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="ml-1 border-2
        border-gray-300
        p-2 rounded-lg font-sans"
        >
          <option value="" disabled>
            Category
          </option>
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        +
      </button>
    </form>
  );
}
