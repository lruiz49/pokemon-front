import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import type { PokedexData } from "./loaders/pokedexLoader";
import { PokemonCard } from "../components/PokemonCard";
import { FilterButton } from "../components/ui/filter";
import { PokeballIcon } from "../components/ui/PokeballIcon";
import { SearchBar } from "../components/ui/SearchBar";
import { TypeBadge } from "../components/ui/TypeBadge";
import { PageLimitDropdown } from "@/components/PageLimitDropown";
import { useRef } from "react";

export default function PokedexPage() {
  const { items, page, totalPages, hasNextPage, hasPreviousPage, limit } =
    useLoaderData() as PokedexData;

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const [params, setParams] = useSearchParams();
  const activeType = (params.get("type") || "").toLowerCase();

  function withViewTransition(run: () => void) {
    const resetInnerScroll = () => scrollerRef.current && (scrollerRef.current.scrollTop = 0);

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        resetInnerScroll(); 
        run();
      });
    } else {
      resetInnerScroll();
      run();
    }
  }


  function setTypeFilter(t: string | null) {
    const next = new URLSearchParams(params);
    if (t) next.set("type", t.toLowerCase());
    else next.delete("type");
    next.set("page", "1");
    withViewTransition(() => setParams(next));
  }



  function goToPage(p: number) {
    const target = Math.min(Math.max(1, p), Math.max(1, totalPages || 1));
    const next = new URLSearchParams(params);
    next.set("page", String(target));
    if (limit) next.set("limit", String(limit));
    withViewTransition(() => setParams(next));
  }

  function getPages(current: number, total: number) {
    const pages: (number | string)[] = [];
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    pages.push(1);
    if (current > 3) {
      pages.push("…");
    }
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (current < total - 2) {
      pages.push("…");
    }
    pages.push(total);
    return pages;
  }

  function setLimit(l: number) {
    if (l === limit) return;


    const next = new URLSearchParams(params);
    next.set("page", "1");
    next.set("limit", String(l));
    withViewTransition(() => setParams(next));

  }

  const pages = getPages(page, totalPages);

  return (
    <div className="h-dvh bg-neutral-100 overflow-hidden flex flex-col">
      <div className="bg-pokedex text-white [view-transition-name:none]">
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

      <main
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-y-auto px-6
                 [scrollbar-gutter:stable_both-edges]
                 [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,.25)_transparent]"
        style={{ viewTransitionName: "pokedex-main" }}
      >

        <div className="text-xl font-semibold ">
          <h1>
            <div className="grid pt-4 pb-6 gap-2 [grid-template-columns:repeat(auto-fill,minmax(95px,1fr))]">
              <TypeBadge
                type="all"
                onClick={() => setTypeFilter(null)}
                className={[
                  !activeType
                    ? "opacity-100 ring-2 ring-black/20"
                    : "opacity-35 hover:opacity-80",
                  "!bg-neutral-500",
                ].join(" ")}
              />

              {[
                "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire",
                "flying", "ghost", "grass", "ground", "ice", "normal", "poison",
                "psychic", "rock", "steel", "water",
              ].map((t) => {
                const isActive = activeType === t;
                const hasActive = !!activeType;
                const cls = isActive
                  ? "opacity-100 ring-2 ring-black/20"
                  : hasActive
                    ? "opacity-35"
                    : "opacity-100 hover:opacity-80";

                return (
                  <TypeBadge
                    key={t}
                    type={t}
                    onClick={() => setTypeFilter(isActive ? null : t)}
                    className={cls}
                  />
                );
              })}
            </div>
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
              {items.map((p) => (
                <Link key={p.id} to={`/pokemon/${p.id}`} prefetch="intent">
                  <PokemonCard id={p.id} name={p.name} imageUrl={p.imageUrl} />
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 py-8">
              <PageLimitDropdown limit={limit} setLimit={setLimit} />

              <button
                className="px-2 py-0.5 text-sm text-gray-600 hover:text-black disabled:text-gray-300"
                onClick={() => goToPage(page - 1)}
                disabled={!hasPreviousPage}
              >
                ← Prev
              </button>

              <div className="flex items-center gap-2 text-sm">
                {pages.map((n, i) =>
                  typeof n === "number" ? (
                    <button
                      key={i}
                      onClick={() => goToPage(n)}
                      aria-current={n === page ? "page" : undefined}
                      className={
                        n === page
                          ? "font-semibold text-black underline underline-offset-4"
                          : "text-gray-500 hover:text-black"
                      }
                    >
                      {n}
                    </button>
                  ) : (
                    <span key={i} className="text-gray-400 select-none">…</span>
                  )
                )}
              </div>

              <button
                className="px-2 py-0.5 text-sm text-gray-600 hover:text-black disabled:text-gray-300"
                onClick={() => goToPage(page + 1)}
                disabled={!hasNextPage}
              >
                Next →
              </button>
            </div>
          </h1>
        </div>
      </main>
    </div>
  );
}
