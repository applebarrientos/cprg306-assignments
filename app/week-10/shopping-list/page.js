"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import {
  getItems,
  addItem,
  deleteItem,
} from "../_services/shopping-list-service";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const { user } = useUserAuth();

  // const [items, setItems] = useState(itemsData);
  const [items, setItems] = useState([]);

  const [selectedItemName, setSelectedItemName] = useState("");

  const loadItems = async () => {
    try {
      if (user) {
        const items = await getItems(user.uid);
        setItems(items);
      }
    } catch (error) {
      console.error("Error loading items: ", error);
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  const handleAddItem = async (newItem) => {
    try {
      if (user) {
        const newItemId = await addItem(user.uid, newItem);
        newItem.id = newItemId;
        setItems((prevItems) => [...prevItems, newItem]);
      }
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      if (user) {
        await deleteItem(user.uid, itemId);
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
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
    <main className="flex min-h-screen flex-col p-2 bg-black text-white">
      <h2 className="text-3xl font-bold text-white">Shopping List</h2>
      <div className="flex space-x-2">
        <div className="flex-1">
          <NewItem onAddItem={handleAddItem} />
          <ItemList
            items={items}
            onItemSelect={handleItemSelect}
            onDeleteItem={handleDeleteItem}
          />
        </div>
        <div className="flex-1">
          {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
        </div>
      </div>
    </main>
  );
}
