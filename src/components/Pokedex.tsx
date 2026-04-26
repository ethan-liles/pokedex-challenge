import { useEffect, useMemo, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { pokemonApi, useGetPokemonListQuery } from '../services/pokemonApi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { Pokemon } from '../services/types'
import FilterBar from './FilterBar'
import PokeballIcon from './PokeballIcon'
import PokemonCard from './PokemonCard'
import styles from './Pokedex.module.css'

function Pokedex() {
  const [nameFilter, setNameFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)

  const { data: listData, isLoading: listLoading } = useGetPokemonListQuery()
  const dispatch = useAppDispatch()

  // Kick off all 151 detail fetches as soon as the list arrives so type
  // filtering has complete data even when a name filter is active.
  useEffect(() => {
    if (!listData) return
    const subscriptions = listData.results.map(({ name }) =>
      dispatch(pokemonApi.endpoints.getPokemon.initiate(name)),
    )
    return () => subscriptions.forEach(sub => sub.unsubscribe())
  }, [dispatch, listData])

  // Read all cached pokemon details from the RTK Query store.
  const allLoadedPokemon = useAppSelector(
    state =>
      listData?.results
        .map(({ name }) => pokemonApi.endpoints.getPokemon.select(name)(state).data)
        .filter((p): p is Pokemon => p !== undefined) ?? [],
    shallowEqual,
  )

  const filteredNames = useMemo(() => {
    if (!listData) return []

    let results = listData.results

    if (nameFilter.trim()) {
      const q = nameFilter.trim().toLowerCase()
      results = results.filter(p => p.name.includes(q))
    }

    if (typeFilter) {
      const matchingNames = new Set(
        allLoadedPokemon
          .filter(p => p.types.some(t => t.type.name === typeFilter))
          .map(p => p.name),
      )
      results = results.filter(p => matchingNames.has(p.name))
    }

    return results
  }, [listData, nameFilter, typeFilter, allLoadedPokemon])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <PokeballIcon size={40} />
        <div className={styles.headerText}>
          <h1 className={styles.title}>Pokédex</h1>
          <span className={styles.subtitle}>Original 151</span>
        </div>
      </header>

      <FilterBar
        nameFilter={nameFilter}
        typeFilter={typeFilter}
        onNameChange={setNameFilter}
        onTypeChange={setTypeFilter}
      />

      {listLoading
        ? (
            <p className={styles.status}>Loading Pokémon...</p>
          )
        : (
            <div className={styles.grid}>
              {filteredNames.length === 0
                ? (
                    <p className={styles.empty}>No Pokémon found.</p>
                  )
                : filteredNames.map(({ name }) => (
                    <PokemonCard key={name} name={name} />
                  ))}
            </div>
          )}
    </div>
  )
}

export default Pokedex
