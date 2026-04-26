import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon, PokemonListResponse } from './types'

const ORIGINAL_151 = 151

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => `pokemon?limit=${ORIGINAL_151}&offset=0`,
    }),
    getPokemon: builder.query<Pokemon, string>({
      query: name => `pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonListQuery, useGetPokemonQuery } = pokemonApi
