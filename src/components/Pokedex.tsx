import { useMemo, useState } from 'react'
import { useGetPokemonListQuery } from '../services/pokemonApi'
import FilterBar from './FilterBar'
import PokeballIcon from './PokeballIcon'
import PokemonCard from './PokemonCard'
import styles from './Pokedex.module.css'

function Pokedex() {
  const [nameFilter, setNameFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null)

  const { data: listData, isLoading: listLoading } = useGetPokemonListQuery()

  const nameFilteredResults = useMemo(() => {
    if (!listData) return []
    if (!nameFilter.trim()) return listData.results

    const q = nameFilter.trim().toLowerCase()
    return listData.results.filter(p => p.name.includes(q))
  }, [listData, nameFilter])

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
              {nameFilteredResults.map(({ name }) => (
                <PokemonCard key={name} name={name} typeFilter={typeFilter} />
              ))}
            </div>
          )}
    </div>
  )
}

export default Pokedex
