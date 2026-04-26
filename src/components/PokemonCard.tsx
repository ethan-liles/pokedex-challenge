import { useGetPokemonQuery } from '../services/pokemonApi'
import { TYPE_COLORS } from '../constants/typeColors'
import styles from './PokemonCard.module.css'

type Props = {
  name: string
  typeFilter: string | null
}

function PokemonCard({ name, typeFilter }: Props) {
  const { data: pokemon, isLoading } = useGetPokemonQuery(name)

  if (isLoading || !pokemon) {
    return <div className={styles.skeleton} />
  }

  if (typeFilter && !pokemon.types.some(t => t.type.name === typeFilter)) {
    return null
  }

  const primaryType = pokemon.types[0].type.name
  const typeColor = TYPE_COLORS[primaryType] ?? '#A8A77A'
  const sprite
    = pokemon.sprites.other['official-artwork'].front_default
      ?? pokemon.sprites.front_default

  return (
    <div
      className={styles.card}
      style={{ '--type-color': typeColor } as React.CSSProperties}
    >
      <div className={styles.imageArea}>
        <span className={styles.number}>
          {`#${String(pokemon.id).padStart(3, '0')}`}
        </span>
        {sprite && (
          <img
            src={sprite}
            alt={pokemon.name}
            className={styles.sprite}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{pokemon.name}</h3>
        <div className={styles.types}>
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={styles.typeBadge}
              style={{ backgroundColor: TYPE_COLORS[type.name] ?? '#A8A77A' }}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
