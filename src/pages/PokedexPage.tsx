// src/pages/PokedexPage.tsx
import { Link, useLoaderData } from "react-router-dom";
import type { PokedexData } from "./loaders/pokedexLoader";
import { PokemonCard } from "../components/PokemonCard";
import { FilterButton } from "../components/ui/filter";
import { PokeballIcon } from "../components/ui/PokeballIcon";
import { SearchBar } from "../components/ui/SearchBar";
import { TypeBadge } from "../components/ui/TypeBadge";

export default function PokedexPage() {
  const { items, page, totalPages } = useLoaderData() as PokedexData; 

  return (
    <div className="min-h-dvh bg-neutral-100">
      <div className="bg-pokedex text-white">
        <div className="px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PokeballIcon className="h-6 w-6 text-white" />
            <span className="text-2xl font-extrabold tracking-tight">Pokedex</span>
          </div>
          <div className="w-[320px] flex items-center gap-2">
            <SearchBar />
            <FilterButton />
          </div>
        </div>
      </div>

      <main className="px-6">
        <div className="text-xl font-semibold">
          <h1>
            <div className="grid pt-4 pb-6 gap-2 [grid-template-columns:repeat(auto-fill,minmax(95px,1fr))]">
              {["bug","dark","dragon","electric","fairy","fighting","fire","flying","ghost","grass","ground","ice","normal","poison","psychic","rock","steel","water"].map(t => (
                <TypeBadge key={t} type={t as any} />
              ))}
            </div>


            <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
              {items.map((p) => (
                <Link key={p.id} to={`/pokemon/${p.id}`} prefetch="intent">
                  <PokemonCard id={p.id} name={p.name} imageUrl={p.imageUrl} />
                </Link>
              ))}
            </div>

            <p className="text-sm text-neutral-500 mt-4">
              Page {page} / {totalPages}
            </p>
          </h1>
        </div>
      </main>
    </div>
  );
}
