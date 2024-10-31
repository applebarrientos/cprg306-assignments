"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const { user } = useUserAuth();

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (name) => {
    // Clean up the name (remove size and emojis)
    const cleanName = name
      .split(",")[0]
      .trim()
      .replace(/[^a-zA-Z\s]/g, "");
    setSelectedItemName(cleanName);
  };

  if (!user) {
    return (
      <main className="bg-slate-950">
        <h2 className="text-3xl font-bold text-white">
          You must be logged in to view this page.
        </h2>
      </main>
    );
  }

  return (
    <main className="bg-slate-950">
      <h2 className="text-3xl font-bold text-white">Shopping List</h2>
      <div className="flex space-x-2">
        <div className="flex-1">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
          {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
        </div>
      </div>
    </main>
  );
}
