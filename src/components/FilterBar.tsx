import { ALL_TYPES, TYPE_COLORS } from '../constants/typeColors'
import styles from './FilterBar.module.css'

type Props = {
  nameFilter: string
  typeFilter: string | null
  onNameChange: (value: string) => void
  onTypeChange: (type: string | null) => void
}

function FilterBar({ nameFilter, typeFilter, onNameChange, onTypeChange }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search Pokémon..."
          value={nameFilter}
          onChange={e => onNameChange(e.target.value)}
        />
      </div>
      <div className={styles.typeList}>
        <button
          className={`${styles.allPill} ${typeFilter === null ? styles.active : ''}`}
          onClick={() => onTypeChange(null)}
        >
          All
        </button>
        {ALL_TYPES.map(type => (
          <button
            key={type}
            className={`${styles.typePill} ${typeFilter === type ? styles.active : ''}`}
            style={{ backgroundColor: TYPE_COLORS[type] }}
            onClick={() => onTypeChange(typeFilter === type ? null : type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar
