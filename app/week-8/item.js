export default function Item({ name, quantity, category, onSelect }) {
  return (
    <ul>
      <li
        className="p-2 m-4 bg-slate-900 max-w-sm cursor-pointer"
        onClick={() => onSelect(name)}
      >
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <div className="text-sm text-white">
          Buy {quantity} in {category}
        </div>
      </li>
    </ul>
  );
}
