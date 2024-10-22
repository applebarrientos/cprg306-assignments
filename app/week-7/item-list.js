"use client";

import Item from "./item";
import { useState } from "react";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");
  const [groupBy, setGroupBy] = useState(false);

  //sort functions
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  //group functions
  const groupedItems = sortedItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  //handle rendering
  const renderItems = () => {
    if (groupBy) {
      return Object.keys(groupedItems).map((category) => (
        <div key={category} className="my-4">
          <h2 className="text-2xl font-bold text-white capitalize px-3">
            {category}
          </h2>
          {groupedItems[category].map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      ));
    } else {
      return sortedItems.map((item) => <Item key={item.id} {...item} />);
    }
  };

  return (
    <main>
      <div className="flex space-x-4 p-4">
        <label className="text-white w-10">Sort by:</label>
        <button
          className={`w-24 px-4 py-2 rounded ${
            sortBy === "name" && !groupBy ? "bg-slate-800" : "bg-slate-900"
          } text-white`}
          onClick={() => {
            setSortBy("name");
            setGroupBy(false);
          }}
        >
          Name
        </button>
        <button
          className={`w-24 px-4 py-2 rounded ${
            sortBy === "category" && !groupBy ? "bg-slate-800" : "bg-slate-900"
          } text-white`}
          onClick={() => {
            setSortBy("category");
            setGroupBy(false);
          }}
        >
          Category
        </button>
        <button
          className={`w-24 px-4 py-2 rounded ${
            groupBy ? "bg-slate-800" : "bg-slate-900"
          } text-white`}
          onClick={() => setGroupBy(true)}
        >
          Grouped Category
        </button>
      </div>
      {renderItems()}
    </main>
  );
}
