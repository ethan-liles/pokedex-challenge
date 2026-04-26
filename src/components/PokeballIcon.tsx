type Props = {
  size?: number
}

function PokeballIcon({ size = 36 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="48" fill="white" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
      <path d="M 2 50 A 48 48 0 0 1 98 50 Z" fill="#ff1a1a" />
      <rect x="2" y="46" width="96" height="8" fill="rgba(0,0,0,0.7)" />
      <circle cx="50" cy="50" r="13" fill="rgba(0,0,0,0.7)" />
      <circle cx="50" cy="50" r="8" fill="white" />
      <circle cx="50" cy="50" r="4" fill="#f0f0f0" />
    </svg>
  )
}

export default PokeballIcon
