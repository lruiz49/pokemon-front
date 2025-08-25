import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useState } from "react"

export function SearchBar() {

    const [value, setValue] = useState("")

    return (
        <div className="
                relative flex items-center h-11 w-[340px] rounded-full bg-white px-4 
                ring-1 ring-neutral-200 shadow-[0_2px_10px_rgba(0,0,0,0.08)]
                hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]
                focus-within:ring-2 focus-within:ring-pokedex/25
            ">
            <Search className="mr-3 h-4 w-4 text-pokedex" aria-hidden />
            <Input
                type="text"
                placeholder="Search"
                className="
                    flex-1 h-10 
                    border-0 bg-transparent p-0 
                    text-black placeholder:text-neutral-500
                    shadow-none 
                    focus:outline-none focus:ring-0 
                    focus-visible:ring-0 focus-visible:ring-offset-0"
                value={value}
                onChange={(e) => setValue(e.target.value)}

            />

            {value && (
                <button
                    type="button"
                    onClick={() => setValue("")}
                    aria-label="Clear search"
                    className="
                        ml-2 mr-1 inline-flex items-center justify-center
                        h-7 w-7 rounded-full
                        text-pokedex/80 hover:text-pokedex
                        hover:bg-black/5 transition
                    "
                >
                    <X className="h-4 w-4" />
                </button>
            )}

        </div>
    )
}