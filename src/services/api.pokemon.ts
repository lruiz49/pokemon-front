import type { Pokemon } from "@/PokemonDetails";
import { http } from "../lib/https";

export type ListParams = { page?: number; limit?: number };

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
  const q = new URLSearchParams();
  if (params.page) q.set("page", String(params.page));
  if (params.limit) q.set("limit", String(params.limit));

  const qs = q.toString();
  return http<BackendListResponse<Pokemon>>(`/pokemon${qs ? `?${qs}` : ""}`);
}

export async function getPokemon(id: string) {}