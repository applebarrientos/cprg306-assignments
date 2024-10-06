"use client";
import { useState } from "react";

export default function Counter() {
  const [quantity, setQuantity] = useState(1);
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

  return (
    <div className="p-2 m-5 bg-white w-40   rounded-lg">
      <div className="flex justify-between">
        <p className="text-gray">{quantity}</p>
        <div className="flex">
          <button
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
  );
}
