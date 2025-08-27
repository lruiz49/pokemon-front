import type { LoaderFunctionArgs } from "react-router-dom";
import { listPokemon } from "../../services/api.pokemon";
import type { Pokemon } from "@/PokemonDetails";

export type PokedexData = {
  items: Pokemon[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export async function pokedexLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const limit = Number(url.searchParams.get("limit") ?? "20");
  const type = url.searchParams.get("type") ?? undefined;

  const res = await listPokemon({ page, limit, type });
  const data: PokedexData = {
    items: res.data,
    total: res.total,
    page: res.page,
    limit: res.limit,
    totalPages: res.totalPages,
    hasNextPage: res.hasNextPage,
    hasPreviousPage: res.hasPreviousPage,
  };
  return data;
}
