export type PokemonListItem = {
  name: string
  url: string
}

export type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

export type PokemonSprites = {
  front_default: string | null
  other: {
    'official-artwork': {
      front_default: string | null
    }
  }
}

export type Pokemon = {
  id: number
  name: string
  sprites: PokemonSprites
  types: PokemonType[]
}
