import type { Pokemon } from "@/PokemonDetails";
import { http } from "../lib/https";

export type ListParams = { page?: number; limit?: number, type?: string};

export type BackendListResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export async function listPokemon(params: ListParams = {}) {
  const { page = 1, limit = 20, type } = params;

  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  }).toString();

  if (type && type.trim()) {
    const t = type.toUpperCase();
    return http<BackendListResponse<Pokemon>>(
      `/pokemon/type/${encodeURIComponent(t)}?${qs}`
    );
  }

  return http<BackendListResponse<Pokemon>>(`/pokemon?${qs}`);

}

export async function getPokemon(id: string | number) {
  return http<Pokemon>(`/pokemon/${encodeURIComponent(String(id))}`);
}