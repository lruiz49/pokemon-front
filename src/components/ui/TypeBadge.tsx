import { typeColors } from "@/lib/typeColors";

export function TypeBadge({ type }: { type: string }) {
  const color = typeColors[type] ?? "bg-gray-300";

  return (
    <div
      className={`
        flex items-center justify-center h-7 px-3 rounded-full 
        text-xs font-semibold text-white capitalize  ${color}
      `}
    >
      {type}
    </div>
  );
}