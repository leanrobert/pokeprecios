export interface CardPrice {
  id: string,
  pokemoncard_id: string,
  rarity: string,
  price: number
}

export interface CardSet {
  id: string,
  name?: string,
  series?: string,
  printedtotal?: number,
  total?: number,
  legalities_unlimited?: string,
  legalities_expanded?: string,
  ptcgocode?: string,
  releasedate?: Date,
  updatedat?: Date,
  images_symbol?: string,
  images_logo?: string
}

export interface PokemonCard {
  id: string,
  name: string,
  supertype: string,
  subtypes: string,
  rules: string | null,
  set_id: string,
  number: number,
  images_small: string,
  level: string | null,
  hp: number,
  types: string,
  nationalpokedexnumbers: number | null,
  cardprices: CardPrice[],
  cardset: CardSet
}

export interface User {
  id: string,
  name: string,
  email: string,
  ispremium: boolean
}

export interface CardQuantity {
  id: string,
  quantity: number,
  cardbookId: string,
  pokemoncardId: string,
  pokemoncard: PokemonCard
}

export interface CardBook {
  id: string,
  name: string,
  userId: string
  user: User
  cardQuantity: CardQuantity[]
}

export interface PokeCardQuantity {
  id: string,
  quantity: number,
  pokemoncardId: string,
  pokemoncard: PokemonCard
}