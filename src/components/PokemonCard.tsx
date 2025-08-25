export type PokemonCardProps = {
    id: number
    name: string
}

export function PokemonCard({ id, name }: PokemonCardProps) {
    return (
        <div className="bg-white rounded-2xl border shadow-sm p-3 transition-shadow hover:shadow-md">
            <div className="flex justify-end">
                <span className="text-xs text-neutral-500 font-medium">
                    #{String(id).padStart(3, '0')}
                </span>
            </div>
            <div className="aspect-square rounded-xl bg-neutral-200 mt-1"></div>
            <div className="pt-3 text-center">
                <div className="text-sm font-medium">{name}</div>
            </div>
        </div>
    )
}