// components/PokemonCard.tsx
export type PokemonCardProps = {
  id: number;
  name: string;
  imageUrl?: string | null;
};

export function PokemonCard({ id, name, imageUrl }: PokemonCardProps) {
  const fallback = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const src = imageUrl && imageUrl.trim() ? imageUrl : fallback;
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-3 transition-shadow hover:shadow-md">
      <div className="flex justify-end">
        <span className="text-xs text-neutral-500 font-medium">
          #{String(id).padStart(3, '0')}
        </span>
      </div>
        
      <div className="aspect-square rounded-xl bg-neutral-200 mt-1 flex items-center justify-center overflow-hidden">
        
        <img
          src={src}
          alt={name}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
        />
      </div>

      <div className="pt-3 text-center">
        <div className="text-sm font-medium">{name}</div>
      </div>
    </div>
  );
}
