import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"

export function FilterButton() {
  return (
    <Button
      type="button"
      size="icon"
      variant="secondary"
      className="
        h-11 w-11 rounded-full
        bg-white text-pokedex
        ring-1 ring-neutral-200
        shadow-[0_2px_8px_rgba(0,0,0,0.06)]
        hover:bg-neutral-100 
        translate-x-[0.5px]
      "
    >
      <ListFilter className="h-5 w-5" />
    </Button>
  )
}