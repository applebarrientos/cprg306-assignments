import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="bg-slate-950">
      <h2 className="text-3xl font-bold p-3 text-white">Shopping List</h2>
      <ItemList />
    </main>
  );
}
