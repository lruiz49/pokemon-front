import { PokemonCard } from './components/PokemonCard'
import { FilterButton } from './components/ui/filter'
import { PokeballIcon } from './components/ui/PokeballIcon'
import { SearchBar } from './components/ui/SearchBar'
import { TypeBadge } from './components/ui/TypeBadge'

function App() {

  const items = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: 'Pokémon Name',
  }))

  return (
    <div className="min-h-dvh bg-neutral-100">
      <div className='bg-pokedex text-white'>
        <div className="px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PokeballIcon className="h-6 w-6 text-white" />
            <span className="text-2xl font-extrabold tracking-tight">Pokedex</span>
          </div>
          <div className="w-[320px] flex items-center gap-2
          ">
            <SearchBar />
            <FilterButton />
          </div>
        </div>
      </div>
      <main className=' px-6 '>
        <div className='text-xl font-semibold'>
          <h1>
            <div className="grid pt-4 pb-6 gap-2 [grid-template-columns:repeat(auto-fill,minmax(95px,1fr))]">
              <TypeBadge type="bug" />
              <TypeBadge type="dark" />
              <TypeBadge type="dragon" />
              <TypeBadge type="electric" />
              <TypeBadge type="fairy" />
              <TypeBadge type="fighting" />
              <TypeBadge type="fire" />
              <TypeBadge type="flying" />
              <TypeBadge type="ghost" />
              <TypeBadge type="grass" />
              <TypeBadge type="ground" />
              <TypeBadge type="ice" />
              <TypeBadge type="normal" />
              <TypeBadge type="poison" />
              <TypeBadge type="psychic" />
              <TypeBadge type="rock" />
              <TypeBadge type="steel" />
              <TypeBadge type="water" />
            </div>
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
              {items.map((item) => (
                <PokemonCard key={item.id} id={item.id} name={item.name} />
              ))}
            </div>
          </h1>
        </div>
      </main>
    </div>
  )
}

export default App