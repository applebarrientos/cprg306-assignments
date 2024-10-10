import NewItem from "./new-item";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <NewItem />
    </main>
  );
}