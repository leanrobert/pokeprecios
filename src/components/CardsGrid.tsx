import type { PokemonCard } from "@/utils/types"
import PokemonCardBox from "./PokemonCardBox"
import Link from "next/link"

const CardsGrid = async ({ cards }: { cards: PokemonCard[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 w-full px-4 pb-4 max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3">
      {cards && cards.map((card: PokemonCard) => (
        <Link href={`/search/${card.id}`} key={card.id}>
          <PokemonCardBox key={card.id} card={card} />
        </Link>
      ))}
    </div>
  )
}

export default CardsGrid