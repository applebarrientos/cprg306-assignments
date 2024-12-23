import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const getItems = async (userId) => {
  try {
    const itemsRef = collection(db, `users/${userId}/items`);
    const itemsQuery = query(itemsRef);
    const itemsSnapshot = await getDocs(itemsQuery);

    const items = [];
    itemsSnapshot.forEach((doc) => {
      items.push({ docId: doc.id, ...doc.data() });
    });

    return items;
  } catch (error) {
    console.error("Error getting items: ", error);
    throw new Error("Error getting items");
  }
};

export const addItem = async (userId, item) => {
  try {
    const itemsRef = collection(db, `users/${userId}/items`);
    const docRef = await addDoc(itemsRef, item);
    return docRef.docId;
  } catch (error) {
    console.error("Error adding item: ", error);
    throw new Error("Error adding item");
  }
};

export const deleteItem = async (userId, itemId) => {
  try {
    const itemRef = doc(db, `users/${userId}/items/${itemId}`);
    await deleteDoc(itemRef);
    console.log(`Item with ID ${itemId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting item: ", error);
    throw new Error("Error deleting item");
  }
};
