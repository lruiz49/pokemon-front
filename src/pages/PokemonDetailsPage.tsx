// src/pages/PokemonDetails.tsx  (must be .tsx)
import { Link, useLoaderData } from "react-router-dom";
import { typeColors } from "../lib/typeColors";
import { getPokemon } from "@/services/api.pokemon";

type Ability = {
  name: string;
  description: string;
  id: number;
  createdAt: string;
  updatedAt: string;
};

type Move = {
  name: string;
  description: string;
  type: string;
  category: string;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type Pokemon = {
  name: string;
  description: string;
  type1: string;
  type2: string | null;
  height: number;
  weight: number;
  imageUrl: string;
  abilityId: number;
  moveIds: number[];
  id: number;
  createdAt: string;
  updatedAt: string;
  ability: Ability;
  moves: Move[];
};

function bannerBackground(type1?: string, type2?: string | null) {
  const t1 = (type1 ?? "").toLowerCase();
  const t2 = (type2 ?? "").toLowerCase();
  const c1 = typeColors[t1] ?? "#9aa0a6";
  const c2 = typeColors[t2] ?? c1;
  if (!t2 || t1 === t2) return c1;
  return `linear-gradient(135deg, ${c1} 0 50%, ${c2} 50% 100%)`;
}

export function PokemonDetailsView({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div style={{ background: bannerBackground(pokemon.type1, pokemon.type2) }}>
      <h1>{pokemon.name}</h1>
      <p>{pokemon.description}</p>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
    </div>
  );
}

export function PokemonDetailPage() {
  const { pokemon } = useLoaderData() as { pokemon: Pokemon };
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <Link to="/" className="underline text-sm">&larr; Back</Link>
      <PokemonDetailsView pokemon={pokemon} />
    </div>
  );
}

export async function detailLoader({ params }: { params: { id?: string } }) {
  const pokemon = params.id ? await getPokemon(params.id) : null;
  if (!pokemon) throw new Response("Not Found", { status: 404 });
  return { pokemon };
}