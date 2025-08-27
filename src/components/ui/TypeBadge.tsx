import { typeColors } from "@/lib/typeColors";

type Props = {
  type: string;
  onClick?: () => void;
  className?: string;
};

export function TypeBadge({ type, onClick, className }: Props) {
  const color = typeColors[type] ?? "bg-gray-300";
  const base =
    "flex items-center justify-center h-7 px-3 rounded-full text-xs font-semibold text-white capitalize transition";
  const cls = `${base} ${color} ${className ?? ""}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {type}
      </button>
    );
  }

  return <div className={cls}>{type}</div>;
}
  