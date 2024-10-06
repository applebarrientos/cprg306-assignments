import Counter from "./new-item.js";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <Counter />
    </main>
  );
}
